import {Injectable} from '@angular/core';
import {ApiCategoryService} from '../api-services/api-category.service';
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly apiCategory: ApiCategoryService,
    private toastService: ToastrService
  ) {
  }

  getAll() {
    return this.apiCategory.getAll();
  }

  create(data: any) {
    return this.apiCategory.create(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastService.success('Thêm danh mục thành công !');
        this.isCloseDialog.next(true);
      }, error: err => {
        console.log(err);
        if (err.error.code == 'UNIQUE') {
          this.toastService.warning(err.error.message);
          return;
        }
        this.toastService.error('Thêm danh mục thất bại !');
      }
    });
  }

  update(data: any) {
    return this.apiCategory.update(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastService.success('Cập nhật danh mục thành công !');
        this.isCloseDialog.next(true);
      }, error: err => {
        console.log(err);
        if (err.error.code == 'UNIQUE') {
          this.toastService.warning(err.error.message);
          return;
        }
        this.toastService.error('Cập nhật danh mục thất bại !');
      }
    });
  }

  updateActive(data: any) {
    return this.apiCategory.update(data);
  }
}
