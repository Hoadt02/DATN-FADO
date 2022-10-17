import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../shared/service/api-service-impl/category.service";
import {BrandService} from "../../shared/service/api-service-impl/brand.service";
import {MaterialService} from "../../shared/service/api-service-impl/material.service";
import {OriginService} from "../../shared/service/api-service-impl/origin.service";
import {ProductDetailsService} from "../../shared/service/api-service-impl/product-details.service";
import {Contants} from "../../shared/Contants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  readonly TYPE_FILTER = Contants.TYPE_FILTER;

  categories: any[] = [];
  brands: any[] = [];
  materials:any[] = [];
  origins: any[] = [];
  products: any[] = [];

  category_id: any[] = [];
  brand_id: any[] = [];
  material_id: any[] = [];
  origin_id: any[] = [];
  gender: any[] = [];
  startPrice: any = null;
  endPrice: any = null;

  url_param:string = '';

  formGroup:FormGroup = this.fb.group({
    startPrice: [null, [Validators.required, Validators.min(0), Validators.max(9999999999)]],
    endPrice: [null, [Validators.required, Validators.min(0), Validators.max(999999999)]]
  });

  constructor(private categoryService: CategoryService,
              private brandService: BrandService,
              private materialService: MaterialService,
              private originService: OriginService,
              private productDetailService: ProductDetailsService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadByProductDetail();
    this.loadByCategory();
    this.loadByBrand();
    this.loadByMaterial();
    this.loadByOrigin();
  }

  // loadProductDetailByFilter(type:string, value:any){
  //   this.setValueFilter(type,value);
  //   const data = {
  //     category_id: this.category_id,
  //     brand_id: this.brand_id,
  //     material_id: this.material_id,
  //     origin_id: this.origin_id,
  //     gender: this.gender,
  //     startPrice: this.startPrice,
  //     endPrice: this.endPrice
  //   }
  //
  //   this.productDetailService.getProductDetailByFilter(data)
  //     .subscribe(data =>{
  //     if (data){
  //       this.products = data;
  //       console.log(data);
  //     }
  //   })
  // }

  loadProductDetailByFilter(type:string, value:any){
    this.setValueFilter(type,value);
    this.setUrlParam();
    console.log(this.url_param);
    if (this.url_param == ''){
      this.loadByProductDetail();
    }else {
      this.productDetailService.getProductDetailByFilter(this.url_param)
        .subscribe(data =>{
          if (data){
            this.products = data;
            console.log(data);
          }
        })
    }
  }

    setValueFilter(type:string,value:any){
    if (type == this.TYPE_FILTER.CATEGORY){
      const index = this.category_id.findIndex(n => n == value);
      if (index > -1){
        this.category_id.splice(index,1);
      }else {
        this.category_id.push(value);
      }
    }else if (type == this.TYPE_FILTER.BRAND){
      const index = this.brand_id.findIndex(n => n == value);
      if (index > -1){
        this.brand_id.splice(index,1);
      }else {
        this.brand_id.push(value);
      }
    }else if (type == this.TYPE_FILTER.MATERIAL){
      const index = this.material_id.findIndex(n => n == value);
      if (index > -1){
        this.material_id.splice(index,1);
      }else {
        this.material_id.push(value);
      }
    }else if (type == this.TYPE_FILTER.ORIGIN){
      const index = this.origin_id.findIndex(n => n == value);
      if (index > -1){
        this.origin_id.splice(index,1);
      }else {
        this.origin_id.push(value);
      }
    }else if (type == this.TYPE_FILTER.GENDER){
      const index = this.gender.findIndex(n => n == value);
      if (index > -1){
        this.gender.splice(index,1);
      }else {
        this.gender.push(value);
      }
    }else if (type == this.TYPE_FILTER.START_PRICE){
      this.startPrice = value;
    } else if (type == this.TYPE_FILTER.END_PRICE){
      this.endPrice = value;
    }
  }

  setUrlParam(){
    this.url_param = '';
    for (const c of this.category_id) {
      this.url_param += "category_id=" + c + "&";
    }
    for (const b of this.brand_id) {
      this.url_param += "brand_id=" + b + "&";
    }
    for (const m of this.material_id) {
      this.url_param += "material_id=" + m + "&";
    }
    for (const o of this.origin_id) {
      this.url_param += "origin_id=" + o + "&";
    }
    for (const g of this.gender) {
      this.url_param += "gender=" + g + "&";
    }
    if (this.startPrice != null && this.endPrice != null ){
      this.url_param += "startPrice=" + this.startPrice + "&endPrice=" + this.endPrice;
    }
  }

  loadByProductDetail(){
    this.productDetailService.getAllProductDetail().subscribe((data:any)=>{
      if (data){
        this.products = data;
      }
    })
  }

  loadByCategory(){
    this.categoryService.getAll().subscribe((data:any) =>{
      if (data){
        this.categories = data;
      }
    });
  }

  loadByBrand(){
    this.brandService.getAll().subscribe((data:any) =>{
      if (data){
        this.brands = data;
      }
    });
  }

  loadByMaterial(){
    this.materialService.getAll().subscribe((data:any) =>{
      if (data){
        this.materials = data;
      }
    });
  }

  loadByOrigin(){
    this.originService.getAll().subscribe((data:any) =>{
      if (data){
        this.origins = data;
      }
    });
  }

  onSubmitFilterPrice() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;

    this.startPrice = this.formGroup.getRawValue().startPrice;
    this.endPrice = this.formGroup.getRawValue().endPrice;

    this.setUrlParam();
    this.productDetailService.getProductDetailByFilter(this.url_param)
      .subscribe(data =>{
        if (data){
          this.products = data;
          console.log(data);
        }
      })
  }
}
