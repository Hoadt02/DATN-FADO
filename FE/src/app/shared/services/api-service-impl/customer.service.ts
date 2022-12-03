import {Injectable} from '@angular/core';
import {ApiCustomerService} from '../api-services/api-customer.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {formatDate} from '../../format/formatData';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly apiCustomer: ApiCustomerService,
    private toastrService: ToastrService,
  ) {
  }
  getAll() {
    return this.apiCustomer.getAll();
  }
  dataReplace(data: any) {
    data.firstname = data.firstname.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    data.lastname = data.lastname.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    data.email = data.email.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
   data.dateOfBirth = formatDate(data.dateOfBirth);
  }
  create(data: any) {
    this.dataReplace(data);
    return this.apiCustomer.create(data).subscribe({
      next: (data: any) => {
        this.toastrService.success('Khách hàng thêm thành công!');
        this.isCloseDialog.next(true);
      }, error: err => {
        console.log(err);
        // tslint:disable-next-line:triple-equals
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Thêm khách hàng thất bại!');
      }
    })
  }

  update(id: number, data: any) {
    this.dataReplace(data);
    return this.apiCustomer.update(id, data).subscribe({
      // tslint:disable-next-line:no-shadowed-variable
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Khách hàng sửa thành công!');
        this.isCloseDialog.next(true);
      }, error: err => {
        console.log(err);
        // tslint:disable-next-line:triple-equals
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Sửa khách hàng thất bại!');
      }
    })
  }

  updatePass(id, customer: any) {

  }

  accuracyPassword(data: any) {
    return this.apiCustomer.getAll()
  }
}
