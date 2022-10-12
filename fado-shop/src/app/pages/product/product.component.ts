import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../shared/service/api-service-impl/category.service";
import {BrandService} from "../../shared/service/api-service-impl/brand.service";
import {MaterialService} from "../../shared/service/api-service-impl/material.service";
import {OriginService} from "../../shared/service/api-service-impl/origin.service";
import {ProductDetailsService} from "../../shared/service/api-service-impl/product-details.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  categories: any[] = [];
  brands: any[] = [];
  materials:any[] = [];
  origins: any[] = [];

  constructor(private categoryService: CategoryService,
              private brandService: BrandService,
              private materialService: MaterialService,
              private originService: OriginService,
              private productDetailService: ProductDetailsService) { }

  ngOnInit(): void {
    this.loadByCategory();
    this.loadByBrand();
    this.loadByMaterial();
    this.loadByOrigin();
  }

  loadByCount(id:number){
    let count = 0;
    console.log(id);
    this.productDetailService.getAllProductDetail().subscribe((data:any)=>{
      for (let i = 0; i < data.length; i++) {
        console.log(data.brand);
      }
      // if (data){
      //   for (let i = 0; i < data.length; i++) {
      //       if (data.brand.id == id){
      //         count = count + 1;
      //       }
      //   }
      // }
    });
    return count;
  }

  loadByProduct(){
    this.productDetailService.getAllProductDetail().subscribe((data:any)=>{

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

}
