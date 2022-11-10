import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiCustomerService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(ApiConstant.customer);
  }

  findByid(id: number) {
    return this.http.get(ApiConstant.customer + `/${id}`)
  }

  findCustomerByEmailAndSendOTP(email:any):Observable<any>{
    return this.http.post(`${ApiConstant.customer}/findCustomerByEmailAndSendOTP`, email);
  }

  create(data: any):Observable<any> {
    return this.http.post(ApiConstant.customer, data);
  }

  update(id: number, data: any):Observable<any> {
    return this.http.put(`${ApiConstant.customer}/${id}`, data);
  }

  accuracyPassword(data:any):Observable<any>{
    return this.http.post(`${ApiConstant.customer}/accuracyPassword`,data);
  }
}
