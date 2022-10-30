import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";

@Injectable({
  providedIn: 'root'
})
export class ApiVoucherService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(ApiConstant.voucher);
  }

  getById(id: number) {
    return this.http.get(`${ApiConstant.voucher}/${id}`);
  }

  create(data: any) {
    return this.http.post(ApiConstant.voucher, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${ApiConstant.voucher}/${id}`, data);
  }
}
