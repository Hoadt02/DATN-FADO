import {Injectable} from '@angular/core';
import {ApiOrderService} from "../api-services/api-order.service";
import {ApiConstant} from "../../constants/api-constant";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private api: ApiOrderService
  ) {
  }

  getALl() {
    return this.api.getALl();
  }

  save(data: any) {
    return this.api.save(data);
  }
}
