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

  findAllByCustomerId(id: number) {
    return this.api.findAllByCustomerId(id);
  }

  save(data: any) {
    return this.api.save(data);
  }

  delete(id: number) {
    return this.api.delete(id);
  }
  getChartBar() {
    return this.api.chartBar();
  }
  getTotalRevenue() {
    return this.api.totalRevenue();
  }
  getTotalOrder() {
    return this.api.totalOrder();
  }
  getOrderCancel() {
    return this.api.orderCancel();
  }
  getTotalOneDay() {
    return this.api.totalOneDay();
  }
}
