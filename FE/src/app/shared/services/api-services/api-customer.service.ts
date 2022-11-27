import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCustomerService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(ApiConstant.customer);
  }

  create(data: any) {
    return this.http.post(ApiConstant.customer, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${ApiConstant.customer}/${id}`, data);
  }
  findStaffByEmailAndSendOTP(email: any):Observable<any> {
    return this.http.post(`${ApiConstant.customer}/findCustomerByEmailAndSendOTP`, email);
  }

  accuracyPassword(data:any):Observable<any> {
    return this.http.post(`${ApiConstant.staff}/accuracyPassword`,data);
  }
}
