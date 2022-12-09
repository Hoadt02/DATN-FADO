import {Injectable, ViewChild} from '@angular/core';
import {ApiProductDetailService} from '../api-services/api-product-detail.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  dataFromHomePage: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  dataSearchFromHeader: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private apiService: ApiProductDetailService){
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

  getCountProductByCategory(id:number){
    return this.apiService.getCountProductByCategory(id);
  }

  getCountProductByBrand(id:number){
    return this.apiService.getCountProductByBrand(id);
  }

  getCountProductByMaterial(id:number){
    return this.apiService.getCountProductByMaterial(id);
  }

  getCountProductByOrigin(id:number){
    return this.apiService.getCountProductByOrigin(id);
  }

  getCountProductByWaterproof(id:number){
    return this.apiService.getCountProductByWaterproof(id);
  }

  getCountProductByFacediameter(id:number){
    return this.apiService.getCountProductByFacediameter(id);
  }

  getCountProductByBatterypower(id:number){
    return this.apiService.getCountProductByBatterypower(id);
  }

  getCountProductByMale(){
    return this.apiService.getCountProductByMale();
  }

  getCountProductByFemale(){
    return this.apiService.getCountProductByFemale();
  }

  getLatestProductDetail(){
    return this.apiService.getLatestProductDetail();
  }

  getProductDetailInPromotional(){
    return this.apiService.getProductDetailInPromotional();
  }

  findProductByName(data:string){
    return this.apiService.findProductByName(data);
  }

  getFeaturedProductDetail(){
    return this.apiService.getFeaturedProductDetail();
  }
}
