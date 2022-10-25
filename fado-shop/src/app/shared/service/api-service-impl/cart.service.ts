import {Injectable} from '@angular/core';
import {ApiCartService} from "../api-services/api-cart.service";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numberPrdInCart$ = new BehaviorSubject<number>(0);
  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
        this.toastrService.success('Thêm sản thành công!');
        this.isCloseDialog.next(true);
      }, error: (err) => {
        console.log(err);
        this.toastrService.error('Thêm sản phẩm vào rỏ hàng không thành công!');
      }
    });
  }

  delete(id: number) {
    return this.apiCartService.delete(id).subscribe({
      next: (rs: any) => {
        console.log(rs);
        this.isCloseDialog.next(true);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  deleteAll(listId: []) {
    return this.apiCartService.deleteAll(listId).subscribe({
      next: (rs: any) => {
        console.log(rs);
      }, error: (err) => {
        console.log(err);
      }
    });
  }

}
