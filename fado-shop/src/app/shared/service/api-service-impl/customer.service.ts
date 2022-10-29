import {Injectable} from '@angular/core';
import {ApiCustomerService} from '../api-services/api-customer.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly apiCustomer: ApiCustomerService) {
  }

  getAll() {
    return this.apiCustomer.getAll();
  }

  findById(id: number) {
    return this.apiCustomer.findByid(id);
  }
}
