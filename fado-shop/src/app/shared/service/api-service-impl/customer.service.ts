import {Injectable} from '@angular/core';
import {ApiCustomerService} from '../api-services/api-customer.service';
import {ToastrService} from 'ngx-toastr';
import {formatDate} from "../../validator/validate";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  isDoneRegister:BehaviorSubject<any> = new BehaviorSubject<any>(false);

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
    data.firstname = data.firstname.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    data.lastname = data.lastname.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    data.address = data.address.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    data.email = data.email.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    data.dateOfBirth=formatDate(data.dateOfBirth);
  }

  create(data: any) {
    this.dataReplace(data);
    this.apiCustomer.create(data).subscribe({
      next: (_) => {
        void this.router.navigate(['/auth/login']);
        this.toastrService.success('Đăng ký thành công!');
      }, error: err => {
        this.isDoneRegister.next(true);
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
        void this.router.navigate(['/auth/login']).then(()=>
          this.toastrService.success('Cập nhật mật khẩu thành công!')
        );
      }, error: err => {
        console.log(err);
        void this.router.navigate(['/auth/login']).then(()=>{
          this.toastrService.error('Cập nhật mật khẩu thất bại, vui lòng thử lại!')
        });
      }
    })
  }

  updateData(id: number, data: any) {
    this.dataReplace(data);
    return this.apiCustomer.update(id, data);
  }

  accuracyPassword(data:any){
    return this.apiCustomer.accuracyPassword(data);
  }
}
