import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject} from "rxjs";
import {ApiVoucherService} from "../api-services/api-voucher.service";
import {formatDate} from "../../format/formatData";

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly apiVoucherService: ApiVoucherService,
    private toastrService: ToastrService,
  ) {
  }

  getAll() {
    return this.apiVoucherService.getAll();
  }

  findById(id: number) {
    return this.apiVoucherService.getById(id).subscribe({
      next: (data: any) => {
        console.log(data);
      }, error: err => {
        if (err.error.code == 'NOT_FOUND') {
          this.toastrService.warning(err.error.message);
        }
        console.log(err);
      }
    })
  }

  dataReplace(data: any) {
    data.description = data.description.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.startDate = formatDate(data.startDate);
    data.endDate = formatDate(data.endDate);
    if (formatDate(data.startDate) > formatDate(new Date())) {
      data.status = 2;
    }else if (formatDate(data.endDate) < formatDate(new Date())){
      data.status = 0;
    }else{
      data.status = 1;
    }
  }

  dataReplaceUpdate(data: any){
    data.description = data.description.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.startDate = formatDate(data.startDate);
    data.endDate = formatDate(data.endDate);
    if (data.status == 1 && formatDate(data.startDate) > formatDate(new Date())) {
      data.status = 2;
    }else if (data.status == 1 && formatDate(data.endDate) < formatDate(new Date())){
      data.status = 0;
      this.toastrService.warning('Voucher đã quá hạn sử dụng');
    }else if (data.status == 1 && formatDate(data.endDate) > formatDate(new Date())){
      data.status = 1;
    }

  }

  create(data: any) {
    this.dataReplace(data);
    return this.apiVoucherService.create(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Thêm voucher thành công!');
        this.isCloseDialog.next(true);
      }, error: err => {
        console.log(err);
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Thêm voucher thất bại!');
      }
    })
  }

  update(id: number, data: any) {
    this.dataReplaceUpdate(data);
    return this.apiVoucherService.update(id, data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Sửa voucher thành công')
        this.isCloseDialog.next(true);
      }, error: err => {
        console.log(err);
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Sửa voucher thất bại!');
      }
    })
  }
}
