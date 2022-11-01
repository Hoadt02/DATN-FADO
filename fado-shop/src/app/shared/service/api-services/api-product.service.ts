import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(ApiConstant.product);
  }
}
