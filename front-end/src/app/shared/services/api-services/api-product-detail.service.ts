import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as http from "http";
import {ApiConstant} from "../../constants/api-constant";
import {Observable} from "rxjs";

let httpOptions: any = {
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
export class ApiProductDetailService{

  constructor(private httpClient:HttpClient) {
  }

  getAllProductDetail(): Observable<any>{
    return this.httpClient.get(ApiConstant.productDetail, httpOptions);
  }

  findProductDetail(id:number): Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/${id}`, httpOptions);
  }

  createProductDetail(data:any): Observable<any>{
    return this.httpClient.post(ApiConstant.productDetail, data, httpOptions);
  }

  updateProductDetail(data:any): Observable<any>{
    return this.httpClient.put(ApiConstant.productDetail, data, httpOptions);
  }
}