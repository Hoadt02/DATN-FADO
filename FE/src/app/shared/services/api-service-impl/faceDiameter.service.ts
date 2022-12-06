import {Injectable} from '@angular/core';
import {ToastrService, ToastToken} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';
import {ApiFaceDiameterService} from '../api-services/api-face-diameter.service';

@Injectable({
  providedIn: 'root'
})
export class FaceDiameterService {

  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly apiFace: ApiFaceDiameterService,
    private toastrService: ToastrService
  ) {
  }

  getAll() {
    return this.apiFace.getAll();
  }

  create(data: any) {
    data.name = data.name.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    return this.apiFace.create(data).subscribe({
      // tslint:disable-next-line:no-shadowed-variable
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Thêm thành công');
        this.isCloseDialog.next(true);
      }, error : err => {
        console.log(err);
        // tslint:disable-next-line:triple-equals
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Thêm thất bại');
      }
    })
  }

  update(id: number, data: any) {
    data.name = data.name.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    return this.apiFace.update(id, data).subscribe({
      // tslint:disable-next-line:no-shadowed-variable
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Sửa thành công');
        this.isCloseDialog.next(true);
      }, error : err => {
        console.log(err);
        // tslint:disable-next-line:triple-equals
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Sửa thất bại');
      }
    })
  }

  delete(id: number, data: any) {
    data.status = 0;
    this.apiFace.update(id, data).subscribe({
      // tslint:disable-next-line:no-shadowed-variable
      next: (data) => {
        console.log(data);
        this.toastrService.success('Xóa mặt kính thành công!');
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error('Xóa mặt kính thất bại!');
        return;
      }
    });
  }

}
