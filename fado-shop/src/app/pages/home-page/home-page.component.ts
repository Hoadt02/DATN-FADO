import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../shared/service/api-service-impl/category.service";
import {ProductDetailsService} from "../../shared/service/api-service-impl/product-details.service";
import {Router} from "@angular/router";
import {ProductPromotionalService} from "../../shared/service/api-service-impl/product-promotional.service";
import {CartService} from "../../shared/service/api-service-impl/cart.service";
import {ToastrService} from "ngx-toastr";
import {StorageService} from "../../shared/service/jwt/storage.service";

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
  productDetailFeatured: any[] = [];

  isLoading = false;

  items: any;
  dataAddToCart: any;

  constructor(private categoryService: CategoryService,
              private apiCart: CartService,
              private toastrService: ToastrService,
              private storageService: StorageService,
              private router: Router,
              private productDetailService: ProductDetailsService,
              private productPromotionalService: ProductPromotionalService) {
  }

   ngOnInit(): void {
    this.getCategory();
    this.getProduct();
    if (this.storageService.getIdFromToken()){
      this.getAllPrdInCart();
    }
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

            // Get featured product
            this.productDetailService.getFeaturedProductDetail().subscribe(res3 => {
              this.productDetailFeatured = res3;
              this.setDataListIdProductCurrent(res3, listIdProductCurrent);

              //Get product promotion current
              this.productPromotionalService.findProductPromotionalByIdProductDetail(listIdProductCurrent).subscribe(data => {
                this.productPromotionalCurrent = data;
                this.isLoading = false;
              })
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
          discount = (100 - this.productPromotionalCurrent[i].promotional.discount) / 100 * this.productPromotionalCurrent[i].productDetail.price;
          break;
      }
    }
    return discount;
  }

  loadPercentProduct(id: number){
    let percent = 0;
    for (let i = 0; i < this.productPromotionalCurrent.length; i++) {
      if (this.productPromotionalCurrent[i].productDetail.id == id) {
        percent = this.productPromotionalCurrent[i].promotional.discount;
        break;
      }
    }
    return percent;
  }

  redirectProduct(id:number,name:string) {
    const data = {
      id:id,
      name:name
    }
    this.productDetailService.dataFromHomePage.next(data);
    void this.router.navigate(['/product']);
  }

  checkIsLogin(): boolean {
    if (!this.storageService.isLoggedIn()) {
      void this.router.navigate(['/auth/login'], {queryParams: {redirectURL: this.router.url}});
      return true;
    }
    return false;
  }

  addToCart(raw: any) {
    // tôi check đăng nhập ở đây nhé
    if (this.checkIsLogin()) return;

    // end check

    if (this.items != null) {
      for (const x of this.items) {
        if (x.productDetail.id == raw.id && x.quantity == raw.quantity) {
          this.toastrService.warning('Sản phẩm trong kho không đủ.');
          return;
        }
      }
    }

    this.dataAddToCart = {
      productDetail: {
        id: raw.id,
      },
      customer: {
        id: this.storageService.getIdFromToken(),
      },
      quantity: 1,
    };

    this.apiCart.addToCart(this.dataAddToCart);
    this.apiCart.isReLoading.subscribe((data) => {
      if (data) {
        this.getAllPrdInCart();
        this.apiCart.isReLoading.next(false);
      }
    });
  }

  getAllPrdInCart() {
    let slPrd = 0;
    this.apiCart.findAllByCustomerId(this.storageService.getIdFromToken()).subscribe({
      next: (data: any) => {
        for (const x of data) {
          this.items = data as any[];
          slPrd += x.quantity;
        }
        this.apiCart.numberPrdInCart$.next(slPrd);
      },
    });
  }
}
