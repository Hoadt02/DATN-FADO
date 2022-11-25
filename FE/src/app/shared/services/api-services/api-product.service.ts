import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(ApiConstant.product);
  }

  create(data: any): Observable<any> {
    return this.http.post(ApiConstant.product, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${ApiConstant.product}/${data.id}`, data);
  }

  findAllByCategoryId(id: number): Observable<any> {
    return this.http.get(`${ApiConstant.product}/findAllByCategoryId/${id}`);
  }
}
