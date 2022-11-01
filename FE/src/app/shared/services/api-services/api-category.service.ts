import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(ApiConstant.category);
  }

  create(data: any): Observable<any> {
    return this.http.post(ApiConstant.category, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`${ApiConstant.category}/${data.id}`, data);
  }

}
