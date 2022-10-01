import {Injectable} from '@angular/core';
import {ApiCustomerService} from '../api-services/api-customer.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private readonly apiCustomer: ApiCustomerService,
  ) {
  }

  getAll() {
    return this.apiCustomer.getAll();
  }

}
