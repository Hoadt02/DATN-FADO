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

  findProductDetail(id: number) {
    return this.apiService.findProductDetail(id);
  }

  getSimilarProduct(id:number){
    return this.apiService.getSimilarProduct(id);
  }

  findProductsWithPaginationAndSortingAndFilter(data:any){
    return this.apiService.findProductsWithPaginationAndSortingAndFilter(data);
  }
}
