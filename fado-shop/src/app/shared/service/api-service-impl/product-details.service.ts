import {Injectable, ViewChild} from '@angular/core';
import {ApiProductDetailService} from '../api-services/api-product-detail.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  idProductDetail: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private apiService: ApiProductDetailService){
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
        }
        return;
      }
    });
  }
}
