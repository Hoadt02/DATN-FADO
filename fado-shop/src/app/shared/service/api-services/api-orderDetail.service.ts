import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";

@Injectable({
  providedIn: 'root'
})
export class ApiOrderDetailService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getAll() {
    return this.http.get(ApiConstant.orderDetail);
  }

  findAllByOrderId(id: number) {
    return this.http.get(`${ApiConstant.orderDetail}/findAllByOrderId/${id}`);
  }

  save(data: any) {
    return this.http.post(ApiConstant.orderDetail, data);
  }
}
