import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";
import {Observable} from "rxjs";

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

  findProductPromotionalByIdProductDetail(data:any):Observable<any>{
    return this.http.post(`${ApiConstant.productPromotional}/findProductPromotionalByIdProductDetail`, data);
  }
}
