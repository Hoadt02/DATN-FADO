import {Injectable} from '@angular/core';
import {ApiCartService} from "../api-services/api-cart.service";
import {BehaviorSubject} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numberPrdInCart$ = new BehaviorSubject<number>(0);
  // listProductInCart$ = new BehaviorSubject<number>(0);
  // numberPrdIn$ = new BehaviorSubject<number>(0);
  discount$ = new BehaviorSubject<number>(0);

  isReLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private apiCartService: ApiCartService,
              private toastrService: ToastrService) {
  }

  findAllByCustomerId(id: number) {
    return this.apiCartService.findAllByCustomerId(id);
  }

  addToCart(data: any) {
    return this.apiCartService.addToCart(data).subscribe({
      next: (_: any) => {
        this.toastrService.success('Thêm sản phẩm vào giỏ hàng thành công!');
        this.isReLoading.next(true);
      }, error: (err) => {
        console.log(err);
        this.toastrService.error('Thêm sản phẩm vào giỏ hàng thất bại!');
      }
    });
  }

  updateQuantity(data: any) {
    return this.apiCartService.updateQuantity(data).subscribe({
      next: (_: any) => {
        this.isReLoading.next(true);
      }, error: (err) => {
        console.log(err);
        this.toastrService.error('Cập nhật thất bại!');
      }
    });
  }

  delete(id: number) {
    return this.apiCartService.delete(id).subscribe({
      next: (_: any) => {
        this.toastrService.success('Xoá thành công!');
        this.isReLoading.next(true);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  deleteByCustomer(id: number) {
    return this.apiCartService.deleteByCustomer(id)
  }

  checkPromotionalInCartByIdCtm() {
    return this.apiCartService.checkPromotionalInCartByIdCtm();
  }
}
