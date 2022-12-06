import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiWaterProofService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(ApiConstant.waterproof);
  }

  create(data: any): Observable<any> {
    return this.http.post(ApiConstant.waterproof, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${ApiConstant.waterproof}/${id}`, data);
  }
}
