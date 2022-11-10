import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";
import {Toast} from "ngx-toastr";

let httpOptions: any = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret"
  })
};

@Injectable({
  providedIn: 'root'
})


export class ApiAddressService {
  url = 'https://online-gateway.ghn.vn/shiip/public-api/master-data';
  urlService = 'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order';

  ngOnInit() {
  }


  constructor(
    private http: HttpClient,
  ) {
  }

  getProvinces() {
    return this.http.get(`${this.url}/province`, httpOptions);
  }

  getDistricts(id: any) {
    return this.http.get(`${this.url}/district?province_id=${id}`);
  }

  getWards(id: any) {
    return this.http.get(`${this.url}/ward?district_id=${id}`);
  }

  getInfoService(data: any) {
    return this.http.post(`${this.urlService}/available-services`, data);
  }

  feeShipping(data: any) {
    return this.http.post(`${this.urlService}/fee`, data);
  }

  findById(id: number) {
    return this.http.get(ApiConstant.address + `/${id}`);
  }

  findByCustomerIdAndDefaultAddress(id: number) {
    return this.http.get(ApiConstant.address + `/default/${id}`);
  }

  findByCustomerId(id: number) {
    return this.http.get(ApiConstant.address + `?idCtm=${id}`);
  }

  save(data: any) {
    return this.http.post(ApiConstant.address, data);
  }

  // update(data: any) {
  //   return this.http.put(ApiConstant.address, data);
  // }

  delete(id: number) {
    return this.http.delete(ApiConstant.address + `/${id}`)
  }
}
