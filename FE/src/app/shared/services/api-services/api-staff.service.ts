import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiStaffService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(ApiConstant.staff);
  }

  findById(id: number) {
    return this.http.get(`${ApiConstant.staff}/${id}`);
  }

  create(data: any) {
    return this.http.post(ApiConstant.staff, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${ApiConstant.staff}/${id}`, data);
  }

  findStaffByEmailAndSendOTP(email:any):Observable<any>{
    return this.http.post(`${ApiConstant.staff}/findStaffByEmailAndSendOTP`, email);
  }

}
