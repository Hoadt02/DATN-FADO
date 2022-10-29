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
}
