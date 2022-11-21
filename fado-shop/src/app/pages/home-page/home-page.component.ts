import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../shared/service/api-service-impl/category.service";
import {ProductDetailsService} from "../../shared/service/api-service-impl/product-details.service";
import {Router} from "@angular/router";
import {ProductPromotionalService} from "../../shared/service/api-service-impl/product-promotional.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  categories: any[] = [];
  productDetailLatest: any[] = [];
  productDetailInPromotion: any[] = [];
  productPromotionalCurrent: any[] = [];

  isLoading = false;

  constructor(private categoryService: CategoryService,
              private productDetailService: ProductDetailsService,
              private router: Router,
              private productPromotionalService: ProductPromotionalService) {
  }

  async ngOnInit(): Promise<void> {
    this.getCategory();
    this.getProduct();
  }

  getCategory() {
    this.categoryService.getAll().subscribe(data =>{
      for (let i = 0; i < data.length; i++) {
        this.productDetailService.getCountProductByCategory(data[i].id).subscribe(res=>{
          data[i].count = res;
        });
      }
      this.categories = data;
    });
  }

  getProduct() {
    this.isLoading = true;
    this.productDetailService.getLatestProductDetail().subscribe(res1 => {
      //Declare listIdProductCurrent
      const listIdProductCurrent: any[] = [];

      // Get product latest
      this.productDetailLatest = res1;
      this.setDataListIdProductCurrent(res1, listIdProductCurrent);

        //Get product in promotion
        this.productDetailService.getProductDetailInPromotional().subscribe(res2 => {
          this.productDetailInPromotion = res2;
          this.setDataListIdProductCurrent(res2,listIdProductCurrent);

            //Get product promotion current
            this.productPromotionalService.findProductPromotionalByIdProductDetail(listIdProductCurrent).subscribe(data => {
              this.productPromotionalCurrent = data;
              this.isLoading = false;
            })
        })
    });
  }

  setDataListIdProductCurrent(data:any, list:any){
    for (let i = 0; i < data.length; i++) {
      let index = list.findIndex((n:any) => n == data[i].id);
      if (index == -1) list.push(data[i].id);
    }
  }

  loadDiscountProduct(id: number) {
    let discount = 0;
    for (let i = 0; i < this.productPromotionalCurrent.length; i++) {
      if (this.productPromotionalCurrent[i].productDetail.id == id) {
        if (this.productPromotionalCurrent[i].promotional.type == true) {
          discount = (100 - this.productPromotionalCurrent[i].promotional.discount) / 100 * this.productPromotionalCurrent[i].productDetail.price;
          break;
        } else {
          discount = this.productPromotionalCurrent[i].productDetail.price - this.productPromotionalCurrent[i].promotional.discount;
          break;
        }
      }
    }
    return discount;
  }

  redirectProduct(id:number,name:string) {
    const data = {
      id:id,
      name:name
    }
    this.productDetailService.dataFromHomePage.next(data);
    void this.router.navigate(['/product']);
  }
}
