import {Injectable} from '@angular/core';
import {ApiCustomerService} from '../api-services/api-customer.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

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
  create(data: any) {
    return this.apiCustomer.create(data).subscribe({
      // tslint:disable-next-line:no-shadowed-variable
      next: (data: any) => {
        console.log(data);
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

  update(data: any, id: number) {
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
        this.toastrService.error('Sửa khách  thất bại!');
      }
    })
  }
}
