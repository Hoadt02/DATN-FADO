import {Injectable} from '@angular/core';
import {ApiOrderService} from "../api-services/api-order.service";
import {ApiConstant} from "../../constants/api-constant";
import {ApiOrderDetailService} from "../api-services/api-orderDetail.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  isReLoad = new BehaviorSubject<boolean>(false);

  constructor(
    private api: ApiOrderDetailService
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
