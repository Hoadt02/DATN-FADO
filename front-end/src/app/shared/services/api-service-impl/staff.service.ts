import {Injectable} from '@angular/core';
import {ApiStaffService} from '../api-services/api-staff.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

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

  dataReplace(data: any) {
    data.firstname = data.firstname.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.lastname = data.lastname.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.address = data.address.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.email = data.email.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
  }

  create(data: any) {
    this.dataReplace(data);
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

  update(id: number, data: any) {
    this.dataReplace(data);
    return this.apiStaff.update(id, data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Sửa nhân viên thành công!');
        this.isCloseDialog.next(true);
      }, error: err => {
        console.log(err);
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Sửa nhân viên thất bại!');
      }
    })
  }

}
