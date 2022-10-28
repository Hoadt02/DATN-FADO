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
    private toastrService: ToastrService,
  ) {
  }

  getProvinces() {
    return this.apiAddress.getProvinces();
  }

  getDistricts(code: any) {
    return this.apiAddress.getDistricts(code);
  }

  getWards(code: any) {
    return this.apiAddress.getWards(code);
  }


  findById(id: number) {
    return this.apiAddress.findById(id);
  }

  findByCustomerIdAndDefaultAddress(id: number) {
    return this.apiAddress.findByCustomerIdAndDefaultAddress(id);
  }

  findByCustomerId(id: number) {
    return this.apiAddress.findByCustomerId(id);
  }

  save(data: any) {
    return this.apiAddress.save(data);
  }

  // update(data: any) {
  //   return this.apiAddress.update(data).subscribe({
  //     next: (data: any) => {
  //       console.log(data);
  //       this.toastrService.success('Sửa địa chỉ thành công!');
  //     }, error: err => {
  //       console.log('Có lỗi sửa địa chỉ: ', err);
  //       this.toastrService.error('Sửa địa chỉ thất bại!');
  //     }
  //   });
  // }

  delete(id: number) {
    return this.apiAddress.delete(id);
  }


}
