import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../shared/service/api-service-impl/category.service";
import {ProductService} from "../../shared/service/api-service-impl/product.service";
import {ProductDetailsService} from "../../shared/service/api-service-impl/product-details.service";
import {CartService} from "../../shared/service/api-service-impl/cart.service";
import {ToastrService} from "ngx-toastr";
import {StorageService} from "../../shared/service/jwt/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  categories: any[] = [];
  productDetails: any[] = [];
  items: any;
  dataAddToCart: any;

  constructor(private categoryService: CategoryService,
              private apiCart: CartService,
              private toastrService: ToastrService,
              private storageService: StorageService,
              private router: Router,
              private productDetailService: ProductDetailsService) {
  }

  ngOnInit(): void {
    this.getCategory();
    this.getProduct();
  }

  getCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data as any[];
    });
  }

  getProduct() {
    this.productDetailService.getAllProductDetail().subscribe((data: any) => {
      this.productDetails = data as any[];
    });
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
