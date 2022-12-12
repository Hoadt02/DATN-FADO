import {Injectable} from '@angular/core';
import {ApiOrderService} from '../api-services/api-order.service';
import {ApiConstant} from '../../constants/api-constant';
import {Observable} from 'rxjs';

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

  changeInfoOrder(data: any) {
    return this.api.changeInfoOrder(data);
  }

  save(data: any) {
    return this.api.save(data);
  }

  updateMua(idOrder: any, data: any) {
    return this.api.updateMua(idOrder, data);
  }

  updateHuy(idOrder: any, data: any) {
    return this.api.updateHuy(idOrder, data);
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

  getListTop() {
    return this.api.getListTop();
  }

  getOrderByStaff(id: number) {
    return this.api.getOrderByStaff(id);
  }

  getOrderById(id: number) {
    return this.api.getOrderById(id);
  }

  findById(id: number) {
    return this.api.findById(id);
  }

  updateStatus(status: number, id: number) {
    return this.api.updateStatus(status, id);
  }

  revertOrder(description: string, id: number) {
    return this.api.revertOrder(description, id);
  }

  getOrderHistory(id: number, status: number) {
    return this.api.getOrderHistory(id, status);
  }

  exportOrder(id: number) {
    return this.api.exportOrder(id);
  }

  filterOrder(data: any) {
    return this.api.filterOrder(data);
  }

  getListOrder(idStaff: any) {
    return this.api.getListOrder(idStaff);
  }
}
