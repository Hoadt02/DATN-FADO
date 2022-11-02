import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";

@Injectable({
  providedIn: 'root'
})
export class ApiProductPromotionalService {

  constructor(
    private http: HttpClient
  ) {
  }

  getAllProductPromotional() {
    return this.http.get(ApiConstant.productPromotional);
  }

  findAllProductPromotionalInCart(idCtm: number) {
    return this.http.get(`${ApiConstant.productPromotional}/findAllProductPromotionalInCart/${idCtm}`);
  }
}
