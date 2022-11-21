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

  findProductDetail(id:number): Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/${id}`);
  }

  getSimilarProduct(id:number):Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/similar/${id}`);
  }

  findProductsWithPaginationAndSortingAndFilter(data:any):Observable<any>{
    return this.httpClient.post(`${ApiConstant.productDetail}/findProductsWithPaginationAndSortingAndFilter`, data);
  }

  getCountProductByCategory(id:number):Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/getCountProductByCategory/${id}`);
  }

  getCountProductByBrand(id:number):Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/getCountProductByBrand/${id}`);
  }

  getCountProductByMaterial(id:number):Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/getCountProductByMaterial/${id}`);
  }

  getCountProductByOrigin(id:number):Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/getCountProductByOrigin/${id}`);
  }

  getCountProductByMale():Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/getCountProductByMale`);
  }

  getCountProductByFemale():Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/getCountProductByFemale`);
  }

  getLatestProductDetail():Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/getLatestProductDetail`);
  }

  getProductDetailInPromotional():Observable<any>{
    return this.httpClient.get(`${ApiConstant.productDetail}/getProductDetailInPromotional`);
  }

  findProductByName(data: string): Observable<any> {
    return this.httpClient.get(`${ApiConstant.productDetail}/find?name=${data}`);
  }
}
