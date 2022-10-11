import {Injectable} from '@angular/core';
import {ApiMaterialService} from '../api-services/api-material.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly apiMaterial: ApiMaterialService,
    private toastrService: ToastrService,
  ) {
  }

  getAll() {
    return this.apiMaterial.getAll();
  }
  create(data: any) {
    return this.apiMaterial.create(data).subscribe({
      // tslint:disable-next-line:no-shadowed-variable
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Chất liệu thêm thành công!');
        this.isCloseDialog.next(true);
      }, error: err => {
        console.log(err);
        // tslint:disable-next-line:triple-equals
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Thêm chất  thất bại!');
      }
    })
  }

  update(id: number, data: any) {
    return this.apiMaterial.update(id, data).subscribe({
      // tslint:disable-next-line:no-shadowed-variable
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Chất liệu sửa thành công!');
        this.isCloseDialog.next(true);
      }, error: err => {
        console.log(err);
        // tslint:disable-next-line:triple-equals
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Sửa chất liệu  thất bại!');
      }
    })
  }
  delete(id: number, data: any) {
    data.status = 0;
    this.apiMaterial.update(id, data).subscribe({
      next: (data) => {
        console.log(data);
        this.toastrService.success('Xóa chất liệu thành công!');
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error('Xóa chất liệu thất bại!');
        return;
      }
    });
  }
}
