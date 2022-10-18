import {Injectable, ViewChild} from '@angular/core';
import {ApiProductDetailService} from '../api-services/api-product-detail.service';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  idProductDetail: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private apiService: ApiProductDetailService,
              private toatService: ToastrService) {
  }

  getAllProductDetail() {
    return this.apiService.getAllProductDetail();
  }

  findProductDetail(id: number) {
    return this.apiService.findProductDetail(id).subscribe({
      next: (data) => {
        console.log(data);
        return data;
      },
      error: (error) => {
        console.log(error);
        if (error.error.code == 'NOT_FOUND') {
          this.toatService.warning(error.error.message);
        }
        return;
      }
    });
  }

  createProductDetail(data: any) {
    this.apiService.createProductDetail(data).subscribe({
      next: (data) => {
        console.log(data);
        this.toatService.success('Thêm mới sản phẩm thành công!');
        this.isCloseDialog.next(true);
        this.idProductDetail.next(data.id);
      },
      error: (error) => {
        console.log(error);
        this.toatService.error('Thêm mới sản phẩm thất bại!');
        this.isCloseDialog.next(false);
        return;
      }
    });
  }

  updateProductDetail(data: any, id: number) {
    this.apiService.updateProductDetail(data, id).subscribe({
      next: (data) => {
        console.log(data);
        this.toatService.success('Cập nhật sản phẩm thành công!');
        this.isCloseDialog.next(true);
      },
      error: (error) => {
        console.log(error);
        this.toatService.error('Cập nhật sản phẩm thất bại!');
        this.isCloseDialog.next(false);
        return;
      }
    });
  }

  activeOrInActiveProductDetail(data: any, id: number, type:number) {
    data.status = type;
    this.apiService.updateProductDetail(data, id).subscribe({
      next: (data) => {
        console.log(data);
        if (type == 1){
          this.toatService.success('Kích hoạt sản phẩm thành công!');
        }else {
          this.toatService.success('Vô hiệu hóa sản phẩm thành công!');
        }
        this.isCloseDialog.next(true);
      },
      error: (error) => {
        console.log(error);
        if (type == 1){
          this.toatService.error('Kích hoạt sản phẩm thất bại!');
        } else {
          this.toatService.error('Vô hiệu hóa sản phẩm thất bại!');
        }
      }
    });
  }
}
