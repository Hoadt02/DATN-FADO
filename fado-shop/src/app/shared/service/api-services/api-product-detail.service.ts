import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiProductDetailService{

  constructor(private httpClient:HttpClient) {
  }

  getAllProductDetail(): Observable<any>{
    return this.httpClient.get(ApiConstant.productDetail);
  }

  findProductDetail(id:number): Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/${id}`);
  }

  getProductDetailByFilter(url_param:string):Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/filter?${url_param}`);
  }

  getSimilarProduct(id:number):Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/similar/${id}`);
  }
}
