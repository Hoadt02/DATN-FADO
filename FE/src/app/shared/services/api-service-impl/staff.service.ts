import {Injectable} from '@angular/core';
import {ApiStaffService} from '../api-services/api-staff.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {formatDate} from "../../format/formatData";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(
    private readonly apiStaff: ApiStaffService,
    private toastrService: ToastrService,
    private router: Router
  ) {
  }

  getAll() {
    return this.apiStaff.getAll();
  }

  findById(id: number) {
    return this.apiStaff.findById(id).subscribe({
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

  dataInput(data: any) {
    data.firstname = data.firstname.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.lastname = data.lastname.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.address = data.address.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.email = data.email.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    data.dateOfBirth = formatDate(data.dateOfBirth);
  }

  create(data: any) {
    this.dataInput(data);
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
    this.dataInput(data);
    return this.apiStaff.update(id, data).subscribe({
      next: (data: any) => {
        console.log('update: ', data);
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

  findStaffByEmailAndSendOTP(email:any) {
    return this.apiStaff.findStaffByEmailAndSendOTP(email);
  }

  updatePass(id: number, data: any) {
    data.dateOfBirth = formatDate(data.dateOfBirth);
    return this.apiStaff.update(id, data).subscribe({
      next: (_) => {
        void this.router.navigate(['/auth/login']);
        this.toastrService.success('Cập nhật mật khẩu thành công!');
      }, error: err => {
        console.log(err);
        void this.router.navigate(['/auth/login']);
        this.toastrService.error('Cập nhật mật khẩu thất bại!');
      }
    })
  }

}
