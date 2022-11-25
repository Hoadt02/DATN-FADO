import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";
import {map, Observable} from "rxjs";

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

  createProductDetail(data:any): Observable<any>{
    return this.httpClient.post(ApiConstant.productDetail, data);
  }

  updateProductDetail(data:any, id:number): Observable<any>{
    return this.httpClient.put(`${ApiConstant.productDetail}/${id}`, data);
  }

  findProductByName(data: string): Observable<any> {
    return this.httpClient.get(`${ApiConstant.productDetail}/find?name=${data}`);
  }

  getListTop3Pro() {
    return this.httpClient.get(`${ApiConstant.productDetail}/listTop3Pro`);
  }
  findProductWithFilter(data:any):Observable<any>{
    return this.httpClient.post(`${ApiConstant.productDetail}/findProductWithFilter`, data)
  }

  getProductDetailByImei(imei: string): Observable<any> {
    return this.httpClient.get(`${ApiConstant.productDetail}/getProductDetailByImei/${imei}`);
  }
}
