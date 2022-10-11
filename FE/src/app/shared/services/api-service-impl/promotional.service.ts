import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject} from "rxjs";
import {ApiPromotionalService} from "../api-services/api-promotional.service";

@Injectable({
  providedIn: 'root'
})
export class PromotionalService {
  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly apiPromotional: ApiPromotionalService,
    private toastrService: ToastrService,
  ) {
  }

  getAll() {
    return this.apiPromotional.getAll();
  }

  findById(id: number) {
    return this.apiPromotional.getById(id).subscribe({
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
    data.name = data.firstname.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.discount = data.lastname.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.description = data.address.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
  }

  create(data: any) {
    this.dataReplace(data);
    return this.apiPromotional.create(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Thêm khuyến mại thành công!');
        this.isCloseDialog.next(true);
      }, error: err => {
        console.log(err);
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Thêm khuyến mại thất bại!');
      }
    })
  }

  update(id: number, data: any) {
    this.dataReplace(data);
    return this.apiPromotional.update(id, data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Sửa khuyến mại thành công!');
        this.isCloseDialog.next(true);
      }, error: err => {
        console.log(err);
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Sửa khuyến mại thất bại!');
      }
    })
  }
}
