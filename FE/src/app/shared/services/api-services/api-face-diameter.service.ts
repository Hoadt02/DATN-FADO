import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiFaceDiameterService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(ApiConstant.facediameter);
  }

  create(data: any): Observable<any> {
    return this.http.post(ApiConstant.facediameter, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${ApiConstant.facediameter}/${id}`, data);
  }
}
