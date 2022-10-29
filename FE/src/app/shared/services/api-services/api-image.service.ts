import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiConstant} from "../../constants/api-constant";

@Injectable({
  providedIn:'root'
})
export class ApiImageService{

  constructor(private httpClient: HttpClient) {
  }

  getImagesByIdProductDetail(id:number): Observable<any>{
    return this.httpClient.get(`${ApiConstant.image}/${id}`);
  }

  createImage(data:any): Observable<any>{
    return this.httpClient.post(ApiConstant.image, data);
  }

  deleteImage(id:number):Observable<any>{
    return this.httpClient.delete(`${ApiConstant.image}/${id}`);
  }
}
