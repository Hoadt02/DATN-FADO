import {Injectable} from '@angular/core';
import {ApiStaffService} from "../api-services/api-staff.service";
import {BehaviorSubject} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(
    private readonly apiStaff: ApiStaffService,
    private toastrService: ToastrService,
  ) {
  }

  getAll() {
    return this.apiStaff.getAll();
  }

  create(data: any) {
    return this.apiStaff.create(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Thêm nhân viên thành công!');
        this.isCloseDialog.next(true);
      }, error: err => {
        console.log(err);
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Thêm nhân viên thất bại!');
      }
    })
  }

}
