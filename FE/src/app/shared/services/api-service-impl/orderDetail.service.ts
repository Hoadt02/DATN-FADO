import {Injectable} from '@angular/core';
import {ApiOrderService} from "../api-services/api-order.service";
import {ApiConstant} from "../../constants/api-constant";
import {ApiOrderDetailService} from "../api-services/api-orderDetail.service";
import {BehaviorSubject} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  isReLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  quantityPrd$ = new BehaviorSubject<number>(0);

  constructor(
    private api: ApiOrderDetailService,
    private toastrService: ToastrService
  ) {
  }

  getAll() {
    return this.api.getAll();
  }

  findAllByOrderId(id: number) {
    return this.api.findAllByOrderId(id);
  }

  getHistory(status: number) {
    return this.api.getHistory(status);
  }

  saveOrderDetail(data: any) {
    return this.api.saveOrderDetail(data);
  }

  updateQuantityOrderDetail(data: any) {
    return this.api.updateQuantityOrderDetail(data).subscribe({
      next: (rs: any) => {
        console.log(rs);
        this.isReLoading.next(true);
      }, error: (err) => {
        console.log(err);
        this.toastrService.error('Cập nhật số lượng thất bại!');
      }
    });
  }

  save(data: any) {
    return this.api.save(data)
  }

  delete(idPro: number) {
    return this.api.deleteByIdProduct(idPro).subscribe({
      next:(_: any) => {
        this.toastrService.success('Đã xóa sản phẩm khỏi hóa đơn !');
        this.isReLoading.next(true);
      }, error: (err) => {
        console.log(err);
        this.toastrService.error('Đã xóa sản phẩm thất bại !');
      }
    });
  }

  findOrderDetailByOrder(id: number) {
    return this.api.findOrderDetailByOrder(id);
  }

}
