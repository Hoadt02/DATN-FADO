import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
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
  providedIn:'root'
})
export class ApiImageService{

  constructor(private httpClient: HttpClient) {
  }

  getImagesByIdProductDetail(id:number): Observable<any>{
    return this.httpClient.get(`${ApiConstant.image}/${id}`, httpOptions);
  }
}
