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

  // getAll() {
  //   return this.api.getAll();
  // }

  findAllDetailByCustomerId(id: number) {
    return this.api.findAllDetailByCustomerId(id);
  }

  findAllByOrderId(id: number) {
    return this.api.findAllByOrderId(id);
  }

  save(data: any) {
    return this.api.save(data)
  }
}
