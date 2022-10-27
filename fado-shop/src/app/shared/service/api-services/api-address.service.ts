import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";
import {Toast} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ApiAddressService {
  url = 'https://provinces.open-api.vn/api/';

  constructor(
    private http: HttpClient,
  ) {
  }

  getProvinces() {
    return this.http.get(this.url + 'p');
  }

  getDistricts(code: any) {
    return this.http.get(this.url + 'p/' + code + '?depth=2');
  }

  getWards(code: any) {
    return this.http.get(this.url + 'd/' + code + '?depth=2');
  }

  findById(id: number) {
    return this.http.get(ApiConstant.address + `/${id}`);
  }

  findByCustomerId(id: number) {
    return this.http.get(ApiConstant.address + `?idCtm=${id}`);
  }

  create(data: any) {
    return this.http.post(ApiConstant.address, data);
  }

  update(data: any) {
    return this.http.put(ApiConstant.address, data);
  }

  delete(id: number) {
    this.http.delete(ApiConstant.address + `/${id}`)
  }
}
