import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";

const httpOptions: any = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret"
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiProductPromotionalService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(ApiConstant.promotionalProduct, httpOptions);
  }

  getProductNotInPromotional(data: any) {
    return this.http.get(`${ApiConstant.promotionalProduct}/getProductNotInPromotional?idPromotional=${data}`, httpOptions);
  }

  create(data: any[]) {
    return this.http.post(ApiConstant.promotionalProduct, data, httpOptions);
  }

  delete(data: any) {
    return this.http.post(ApiConstant.promotionalProduct + '/delete', data, httpOptions);
  }
}
