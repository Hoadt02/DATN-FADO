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

  findByid(id: number) {
    return this.http.get(ApiConstant.customer + `/${id}`, httpOptions)
  }

}
