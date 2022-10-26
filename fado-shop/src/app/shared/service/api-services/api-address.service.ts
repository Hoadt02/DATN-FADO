import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";
import {Toast} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ApiAddressService {

  constructor(
    private http: HttpClient,
  ) {
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
