import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';

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
}
