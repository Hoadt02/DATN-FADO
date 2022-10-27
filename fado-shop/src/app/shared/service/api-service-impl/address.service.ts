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

  findByCustomerId(id: number) {
    return this.apiAddress.findByCustomerId(id);
  }

  create(data: any) {
    return this.apiAddress.create(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Thêm địa chỉ thành công!');
      }, error: err => {
        console.log('Có lỗi thêm địa chỉ: ', err);
        this.toastrService.error('Thêm địa chỉ thất bại!');
      }
    });
  }

  update(data: any) {
    return this.apiAddress.update(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Sửa địa chỉ thành công!');
      }, error: err => {
        console.log('Có lỗi sửa địa chỉ: ', err);
        this.toastrService.error('Sửa địa chỉ thất bại!');
      }
    });
  }

  delete(id: number) {
    this.apiAddress.delete(id);
  }


}
