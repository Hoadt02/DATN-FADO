import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../shared/service/api-service-impl/category.service";
import {ProductService} from "../../shared/service/api-service-impl/product.service";
import {ProductDetailsService} from "../../shared/service/api-service-impl/product-details.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  categories: any[] = [];
  productDetails: any[] = [];

  constructor(private categoryService: CategoryService,
              private productDetailService: ProductDetailsService) {
  }

  ngOnInit(): void {
    this.getCategory();
    this.getProduct();
  }

  getCategory() {
    this.categoryService.getAll().subscribe((data:any) =>{
      this.categories = data as any[];
    });
  }

  getProduct() {
    this.productDetailService.getAllProductDetail().subscribe((data:any) => {
      this.productDetails = data as any[];
    });
  }
}
