import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";

@Injectable({
  providedIn: 'root'
})
export class ApiOrderService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getALl() {
    return this.http.get(ApiConstant.order);
  }

  findAllByCustomerId(id: number) {
    return this.http.get(`${ApiConstant.order}/findAllByCustomerId/${id}`);
  }

  save(data: any) {
    return this.http.post(ApiConstant.order, data);
  }

  delete(id: number) {
    return this.http.delete(`${ApiConstant.order}/${id}`);
  }
  chartBar() {
    return this.http.get(`${ApiConstant.order}/chartBar`);
  }
  totalRevenue() {
    return this.http.get(`${ApiConstant.order}/totalRevenue`);
  }
  totalOrder() {
    return this.http.get(`${ApiConstant.order}/totalOrder`);
  }
  orderCancel() {
    return this.http.get(`${ApiConstant.order}/orderCancel`);
  }
  totalOneDay() {
    return this.http.get(`${ApiConstant.order}/totalOneDay`);
  }
}
