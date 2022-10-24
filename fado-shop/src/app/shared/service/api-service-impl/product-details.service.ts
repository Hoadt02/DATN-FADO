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

  findProductDetail(id: number) {
    return this.apiService.findProductDetail(id);
  }

  getSimilarProduct(id:number){
    return this.apiService.getSimilarProduct(id);
  }
}
