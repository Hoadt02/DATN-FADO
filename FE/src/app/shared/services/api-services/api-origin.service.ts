import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';

@Injectable({
  providedIn: 'root'
})
export class ApiOriginService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(ApiConstant.origin);
  }

  create(data : any){
    return this.http.post(ApiConstant.origin,data);
  }

  update(id : number,data : any){
    return this.http.put(`${ApiConstant.origin}/${id}`,data);
  }
}
