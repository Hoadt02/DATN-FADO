import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../shared/service/api-service-impl/category.service';
import {BrandService} from '../../shared/service/api-service-impl/brand.service';
import {MaterialService} from '../../shared/service/api-service-impl/material.service';
import {OriginService} from '../../shared/service/api-service-impl/origin.service';
import {ProductDetailsService} from '../../shared/service/api-service-impl/product-details.service';
import {Contants} from '../../shared/Contants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CartService} from '../../shared/service/api-service-impl/cart.service';
import {checkCheckPrice} from '../../shared/validator/validate';
import {ToastrService} from "ngx-toastr";
import {StorageService} from "../../shared/service/jwt/storage.service";
import {Router} from "@angular/router";
import {ProductPromotionalService} from "../../shared/service/api-service-impl/product-promotional.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  readonly TYPE_SORT = Contants.TYPE_SORT;
  readonly TYPE_SHOW = Contants.TYPE_SHOW;
  readonly TYPE_FILTER = Contants.TYPE_FILTER;

  // name sort product and show many product
  sort_name = 'Sắp xếp';
  show_name = 'Hiển thị: 12';

  // params sorting and paging
  page = 0;
  size = 12;
  sort = 0;
  totalPages: any[] = [];

  // get value oninit
  categories: any[] = [];
  brands: any[] = [];
  materials: any[] = [];
  origins: any[] = [];
  products: any[] = [];

  // params filter
  category_id: any[] = [];
  brand_id: any[] = [];
  material_id: any[] = [];
  origin_id: any[] = [];
  gender: any[] = [];
  startPrice: any = null;
  endPrice: any = null;

  // url filter
  url_param: string = '';

  //-------------------------------
  dataAddToCart: any;
  items: any;
  productPromotionals: any;

  //-------------------------------

  formGroup: FormGroup = this.fb.group(
    {
      startPrice: [null, [Validators.required]],
      endPrice: [null, [Validators.required]],
    },
    {
      validators: checkCheckPrice('startPrice', 'endPrice'),
    }
  );

  constructor(
    private categoryService: CategoryService,
    private brandService: BrandService,
    private materialService: MaterialService,
    private originService: OriginService,
    private productDetailService: ProductDetailsService,
    private readonly apiCart: CartService,
    private readonly apiProductPromotional: ProductPromotionalService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllProductPromotional();
    if (this.storageService.getIdFromToken()) {
      this.getAllPrdInCart();
    }
    this.loadByProductDetail();
    this.loadByCategory();
    this.loadByBrand();
    this.loadByMaterial();
    this.loadByOrigin();
  }

  // Start get value oninit
  loadByProductDetail() {
    this.setUrlParam();
    this.productDetailService.findProductsWithPaginationAndSortingAndFilter(this.page, this.size, this.sort, this.url_param).subscribe((data: any) => {
      this.products = data.content;
      this.totalPages = [];
      for (let i = 0; i < data.totalPages; i++) {
        this.totalPages.push(i + 1);
      }
    });
  }

  loadByCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      if (data) {
        this.categories = data;
      }
    });
  }

  loadByBrand() {
    this.brandService.getAll().subscribe((data: any) => {
      if (data) {
        this.brands = data;
      }
    });
  }

  loadByMaterial() {
    this.materialService.getAll().subscribe((data: any) => {
      if (data) {
        this.materials = data;
      }
    });
  }

  loadByOrigin() {
    this.originService.getAll().subscribe((data: any) => {
      if (data) {
        this.origins = data;
      }
    });
  }
  // End

  // Start set filter with click checkbox
  addValueFilter(data:any, value:any){
    const index = data.findIndex((n:any) => n == value);
    if (index > -1) {
      data.splice(index, 1);
    } else {
      data.push(value);
    }
  }

  setValueFilter(type: string, value: any) {
    if (type == this.TYPE_FILTER.CATEGORY) this.addValueFilter(this.category_id,value);
    else if (type == this.TYPE_FILTER.BRAND) this.addValueFilter(this.brand_id,value);
    else if (type == this.TYPE_FILTER.MATERIAL) this.addValueFilter(this.material_id, value);
    else if (type == this.TYPE_FILTER.ORIGIN) this.addValueFilter(this.origin_id, value);
    else if (type == this.TYPE_FILTER.GENDER) this.addValueFilter(this.gender, value);
    else if (type == this.TYPE_FILTER.START_PRICE) this.startPrice = value;
    else if (type == this.TYPE_FILTER.END_PRICE) this.endPrice = value;
    this.loadByProductDetail();
  }
  // End

  // Start set url param
  assembleUrlParam(data:any,type:string){
    for (const param of data){
      this.url_param += type + '=' + param + '&'
    }
  }

  setUrlParam() {
    this.url_param = '';
    if (this.category_id.length > 0) this.assembleUrlParam(this.category_id,this.TYPE_FILTER.CATEGORY);
    if (this.brand_id.length > 0) this.assembleUrlParam(this.brand_id,this.TYPE_FILTER.BRAND);
    if (this.material_id.length > 0) this.assembleUrlParam(this.material_id,this.TYPE_FILTER.MATERIAL);
    if (this.origin_id.length > 0) this.assembleUrlParam(this.origin_id,this.TYPE_FILTER.ORIGIN);
    if (this.gender.length > 0) this.assembleUrlParam(this.gender,this.TYPE_FILTER.GENDER);
    if (this.startPrice != null && this.endPrice != null) this.url_param += 'startPrice=' + this.startPrice + '&endPrice=' + this.endPrice;
  }
  // End

  // submit filter price
  onSubmitFilterPrice() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;

    this.startPrice = this.formGroup.getRawValue().startPrice;
    this.endPrice = this.formGroup.getRawValue().endPrice;

    this.loadByProductDetail();
  }

  // Start sorting and paging
  setSortProduct(type: string) {
    if (type == this.TYPE_SORT.PRICE_DOWN) {
      this.sort_name = 'Giá: từ thấp đến cao';
      this.page = 0;
      this.sort = 1;
      this.loadByProductDetail();
    } else if (type == this.TYPE_SORT.PRICE_UP) {
      this.sort_name = 'Giá: từ cao đến thấp';
      this.page = 0;
      this.sort = 2;
      this.loadByProductDetail();
    }
  }

  setShowProduct(type: string) {
    if (type == this.TYPE_SHOW.SHOW_8) {
      if (this.size == 8) return;
      this.show_name = 'Hiển thị: 8';
      this.page = 0;
      this.size = 8;
      this.loadByProductDetail();
    } else if (type == this.TYPE_SHOW.SHOW_12) {
      if (this.size == 12) return;
      this.show_name = 'Hiển thị: 12';
      this.page = 0;
      this.size = 12;
      this.loadByProductDetail();
    } else if (type == this.TYPE_SHOW.SHOW_20) {
      if (this.size == 20) return;
      this.show_name = 'Hiển thị: 20';
      this.page = 0;
      this.size = 20;
      this.loadByProductDetail();
    }
  }

  changePage(page: number) {
    if (page - 1 == this.page) return;
    this.page = page - 1;
    this.loadByProductDetail();
  }
  // End


  //----------------------------------------------------------
  addToCart(raw: any) {
    // tôi check đăng nhập ở đây nhé
    if (this.checkIsLogin()) return;

    // end check

    if (this.items != null) {
      for (const x of this.items) {
        if (x.productDetail.id == raw.id && x.quantity == raw.quantity) {
          this.toastrService.warning('Số lượng trong rỏ hàng đã bằng số lượng trong kho');
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
        // this.apiCart.listProductInCart$.next(data);
      },
    });
  }

  getAllProductPromotional() {
    this.apiProductPromotional.getAllProductPromotional().subscribe({
      next: (data: any) => {
        this.productPromotionals = data as any;
      }
    })
  }

  checkIsLogin(): boolean {
    if (!this.storageService.isLoggedIn()) {
      void this.router.navigate(['/auth/login'], {queryParams: {redirectURL: this.router.url}});
      return true;
    }
    return false;
  }
}
