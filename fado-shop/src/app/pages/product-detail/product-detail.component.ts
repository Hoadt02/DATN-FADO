import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductDetailsService} from "../../shared/service/api-service-impl/product-details.service";
import {ImageService} from "../../shared/service/api-service-impl/image.service";
import {CartService} from "../../shared/service/api-service-impl/cart.service";
import {ToastrService} from "ngx-toastr";
import {StorageService} from "../../shared/service/jwt/storage.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productDetail: any;
  listImg: any[] = [];
  listSimilarProduct: any[] = [];

  //-------------------------------
  dataAddToCart: any;
  slSP: number = 1;
  checkSl = false;
  items: any;

  //-------------------------------

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productDetailService: ProductDetailsService,
              private imageService: ImageService,
              private apiCart: CartService,
              private toastrService: ToastrService,
              private storageService: StorageService,
  ) {
  }

  ngOnInit(): void {
    this.getProductDetailAndAnyInfomation();
    if (this.storageService.getIdFromToken()) {
      this.getAllPrdInCart();
    }
  }

  getProductDetailAndAnyInfomation() {
    //Get product detail
    this.productDetailService.findProductDetail(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        //set value productDetail
        this.productDetail = data;

        //Get img of product detail
        this.imageService.getImagesByIdProductDetail(data.id).subscribe(res1 => {
          this.listImg = res1;
        });

        //Get similar product
        this.productDetailService.getSimilarProduct(data.product.id).subscribe(res2 => {
          this.listSimilarProduct = res2.filter((n: any) => n.id != this.productDetail.id);
        })
      },
      error: (error) => {
        console.log(error);
        if (error.error.code == 'NOT_FOUND') {
          console.log(error.error.message);
        }
        void this.router.navigate(['/product']);
      }
    });


  }

  addToCart(idPrd: number) {
    // tôi check đăng nhập ở đây nhé
    if (this.checkIsLogin()) return;
    // end check

    if (this.slSP > this.productDetail.quantity) {
      this.checkSl = true;
    } else {
      for (const x of this.items) {
        if (x.productDetail.id == idPrd && (x.quantity + this.slSP) > this.productDetail.quantity) {
          this.toastrService.warning('Số lượng trong rỏ hàng đã bằng số lượng trong kho');
          return;
        }
      }
      this.dataAddToCart = {
        productDetail: {
          id: idPrd,
        },
        customer: {
          id: this.storageService.getIdFromToken(),
        },
        quantity: this.slSP,
      };

      this.apiCart.addToCart(this.dataAddToCart);
      this.apiCart.isReLoading.subscribe((data) => {
        if (data) {
          this.getAllPrdInCart();
          this.apiCart.isReLoading.next(false);
        }
      });
    }
  }

  getAllPrdInCart() {
    let slPrd = 0;
    this.apiCart.findAllByCustomerId(this.storageService.getIdFromToken()).subscribe({
      next: (data: any) => {
        this.items = data as any;
        for (const x of data) {
          slPrd += x.quantity;
        }
        this.apiCart.numberPrdInCart$.next(slPrd);
      },
    });
  }

  checkIsLogin(): boolean {
    if (!this.storageService.isLoggedIn()) {
      void this.router.navigate(['/auth/login'], {queryParams: {redirectURL: this.router.url}});
      return true;
    }
    return false;
  }

  slideConfig = {
    slidesToShow: 6,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [{
      breakpoint: 1216,
      settings: {
        arrows: false,
        slidesToShow: 5
      }
    }, {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 4
        }
      }, {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3
        }
      }, {
        breakpoint: 544,
        settings: {
          arrows: false,
          slidesToShow: 2
        }
      }]
  };
}
