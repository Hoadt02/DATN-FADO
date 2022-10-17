import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";
import {Observable} from "rxjs";

let httpOptions: any = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
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

  // getProductDetailByFilter(data:any):Observable<any>{
  //   return this.httpClient.post(`${ApiConstant.productDetail}/filter`, data, httpOptions);
  // }

  getProductDetailByFilter(url_param:string):Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/filter?${url_param}`, httpOptions);
  }
}
