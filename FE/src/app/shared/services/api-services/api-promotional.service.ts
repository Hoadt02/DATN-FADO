import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";

@Injectable({
  providedIn: 'root'
})
export class ApiPromotionalService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get(ApiConstant.promotional);
  }

  findAllByStatusTrue() {
    return this.http.get(ApiConstant.promotional + '/findAllByStatusTrue');
  }

  getById(id: number) {
    return this.http.get(`${ApiConstant.promotional}/${id}`);
  }

  create(data: any) {
    return this.http.post(ApiConstant.promotional, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${ApiConstant.promotional}/${id}`, data);
  }

  filterAll(data: any) {
    return this.http.post(`${ApiConstant.promotional}/filter`, data);
  }
}
