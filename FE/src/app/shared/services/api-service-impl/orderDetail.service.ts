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

  isReLoad = new BehaviorSubject<boolean>(false);

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




  saveOrderDetail(data: any) {
    return this.api.saveOrderDetail(data);
  }

  updateQuantityOrderDetail(data: any) {
    return this.api.updateQuantityOrderDetail(data).subscribe({
      next: (rs: any) => {
        console.log(rs);
        this.isReLoad.next(true);
      }, error: (err) => {
        console.log(err);
        this.toastrService.error('Cập nhật số lượng thất bại!');
      }
    });;
  }

  save(data: any) {
    return this.api.save(data)
  }

  delete(id: number) {
    return this.api.delete(id);
  }

  findOrderDetailByOrder(id: number) {
    return this.api.findOrderDetailByOrder(id);
  }
}
