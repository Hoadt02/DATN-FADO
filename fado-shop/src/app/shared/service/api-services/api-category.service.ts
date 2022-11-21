import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {
  constructor(private http: HttpClient) {
  }

  getAll():Observable<any> {
    return this.http.get(ApiConstant.category);
  }
}
