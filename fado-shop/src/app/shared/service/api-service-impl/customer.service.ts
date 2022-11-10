import {Injectable} from '@angular/core';
import {ApiCustomerService} from '../api-services/api-customer.service';
import {ToastrService} from 'ngx-toastr';
import {formatDate} from "../../validator/validate";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private readonly apiCustomer: ApiCustomerService,
              private toastrService: ToastrService,
              private router: Router) {
  }

  getAll() {
    return this.apiCustomer.getAll();
  }

  findById(id: number) {
    return this.apiCustomer.findByid(id);
  }

  findCustomerByEmailAndSendOTP(email:any) {
   return this.apiCustomer.findCustomerByEmailAndSendOTP(email);
  }

  dataReplace(data: any){
    data.dateOfBirth=formatDate(data.dateOfBirth);
  }

  create(data: any) {
    this.dataReplace(data);
    this.apiCustomer.create(data).subscribe({
      next: (_) => {
        void this.router.navigate(['/auth/login']);
        this.toastrService.success('Đăng ký thành công!');
      }, error: err => {
        console.log(err);
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Đăng ký thất bại!');
      }
    })
  }

  updatePass(id: number, data: any) {
    this.dataReplace(data);
    this.apiCustomer.update(id, data).subscribe({
      next: (_) => {
        void this.router.navigate(['/auth/login']);
        this.toastrService.success('Cập nhật mật khẩu thành công!');
      }, error: err => {
        console.log(err);
        void this.router.navigate(['/auth/login']);
        this.toastrService.error('Cập nhật mật khẩu thất bại, vui lòng thử lại!');
      }
    })
  }

  accuracyPassword(data:any){
    return this.apiCustomer.accuracyPassword(data);
  }
}
