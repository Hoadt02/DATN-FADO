import {Injectable} from '@angular/core';
import {ApiCustomerService} from '../api-services/api-customer.service';
import {urlToHttpOptions} from 'url';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';
import {ApiCategoryService} from '../api-services/api-category.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly apiCustomer: ApiCustomerService,
  ) {
  }
  getAll() {
    return this.apiCustomer.getAll();
  }
  create(data: any) {
    return this.apiCustomer.create(data);
  }

  update(data: any, id: number) {
    return this.apiCustomer.update(data, id);
  }
}
