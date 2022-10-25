import {Injectable} from '@angular/core';
import {ApiCartService} from "../api-services/api-cart.service";
import {BehaviorSubject} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numberPrdInCart$ = new BehaviorSubject<number>(0);
  numberPrdIn$ = new BehaviorSubject<number>(0);
  isReLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private apiCartService: ApiCartService,
              private toastrService: ToastrService) {
  }

  findAllByCustomerId(id: number) {
    return this.apiCartService.findAllByCustomerId(id);
  }

  addToCart(data: any) {
    return this.apiCartService.addToCart(data).subscribe({
      next: (rs: any) => {
        console.log(rs);
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
      next: (rs: any) => {
        console.log(rs);
        this.toastrService.success('Cập nhật thành công!');
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

  deleteAll(listId: []) {
    return this.apiCartService.deleteAll(listId).subscribe({
      next: (_: any) => {
      }, error: (err) => {
        console.log(err);
      }
    });
  }

}
