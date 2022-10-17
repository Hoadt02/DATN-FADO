import {Injectable, ViewChild} from '@angular/core';
import {ApiProductDetailService} from '../api-services/api-product-detail.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private apiService: ApiProductDetailService){
  }

  getAllProductDetail() {
    return this.apiService.getAllProductDetail();
  }

  getProductDetailByFilter(url_param:string){
    return this.apiService.getProductDetailByFilter(url_param);
  }

  // getProductDetailByFilter(data:any){
  //   return this.apiService.getProductDetailByFilter(data);
  // }

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
