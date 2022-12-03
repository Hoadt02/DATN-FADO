import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";

@Injectable({
  providedIn: 'root'
})
export class ApiProductPromotionalService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(ApiConstant.promotionalProduct);
  }

  getProductNotInPromotional() {
    return this.http.get(`${ApiConstant.promotionalProduct}/getProductNotInPromotional`);
  }

  create(data: any[]) {
    return this.http.post(ApiConstant.promotionalProduct, data);
  }

  delete(data: any) {
    return this.http.post(ApiConstant.promotionalProduct + '/delete', data);
  }

  getPromotional(idOrder: number) {
    return this.http.get(`${ApiConstant.promotionalProduct}/getPromotional?idO=${idOrder}`);
  }

  getDiscount(idPd: number) {
    return this.http.get(`${ApiConstant.promotionalProduct}/getDiscount/${idPd}`)
  }
}
