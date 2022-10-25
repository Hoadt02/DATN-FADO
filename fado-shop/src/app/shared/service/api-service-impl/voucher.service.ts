import {Injectable} from '@angular/core';
import {ApiVoucherService} from "../api-services/api-voucher.service";

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(
    private readonly apiVoucherService: ApiVoucherService,
  ) {
  }

  getAll() {
    return this.apiVoucherService.getAll();
  }
}
