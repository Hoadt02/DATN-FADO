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

  // getALl() {
  //   return this.http.get(ApiConstant.order);
  // }

  findAllByCustomerId(id: number) {
    return this.http.get(`${ApiConstant.order}/findAllByCustomerId/${id}`);
  }

  changeInfoOrder(data: any) {
    return this.http.put(`${ApiConstant.order}/changeInfoOrder`, data);
  }

  findById(id: number) {
    return this.http.get(`${ApiConstant.order}/${id}`);
  }

  save(data: any) {
    return this.http.post(ApiConstant.order, data);
  }

  updateStatus(status: number, id: number) {
    return this.http.get(`${ApiConstant.order}/updateStatus?status=${status}&id=${id}`)
  }
}
