import {Injectable} from '@angular/core';
import {ApiConstant} from "../../constants/api-constant";
import {ApiAddressService} from "../api-services/api-address.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private apiAddress: ApiAddressService,
  ) {
  }

  getProvinces() {
    return this.apiAddress.getProvinces();
  }

  getDistricts(id: any) {
    return this.apiAddress.getDistricts(id);
  }

  getWards(id: any) {
    return this.apiAddress.getWards(id);
  }

  getInfoService(data: any) {
    return this.apiAddress.getInfoService(data);
  }

  feeShipping(data: any) {
    return this.apiAddress.feeShipping(data);
  }
}
