import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConstant} from "../../constants/api-constant";

@Injectable({
  providedIn: 'root'
})
export class ApiCartService {
  constructor(private http: HttpClient) {
  }

  findAllByCustomerId(id: number) {
    return this.http.get(`${ApiConstant.cart}?id=${id}`);
  }

  addToCart(data: any) {
    return this.http.post(ApiConstant.cart, data);
  }

  updateQuantity(data: any) {
    return this.http.put(ApiConstant.cart + "/updateQuantity", data);
  }

  delete(id: number) {
    return this.http.delete(`${ApiConstant.cart}?id=${id}`);
  }

  deleteByCustomer(id: number) {
    return this.http.delete(ApiConstant.cart + `/deleteByCustomer/${id}`);
  }

  checkStatusById() {
    return this.http.get(ApiConstant.cart + `/checkStatusById`);
  }
}
