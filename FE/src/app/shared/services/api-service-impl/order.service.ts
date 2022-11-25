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

  update(idOrder: any,data: any) {
    return this.api.update(idOrder,data);
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
  getOrderByStaff(id: number) {
    return this.api.getOrderByStaff(id);
  }

  getOrderById(id: number) {
    return this.api.getOrderById(id);
  }

  updateStatus(status: number, id: number) {
    return this.api.updateStatus(status, id);
  }

  getOrderHistory(id: number, status: number) {
    return this.api.getOrderHistory(id, status);
  }
}
