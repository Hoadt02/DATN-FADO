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

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  readonly TYPE_SORT = Contants.TYPE_SORT;
  readonly TYPE_FILTER = Contants.TYPE_FILTER;

  sort_name = 'Sắp xếp';
  sort_value = 0;

  categories: any[] = [];
  brands: any[] = [];
  materials: any[] = [];
  origins: any[] = [];
  products: any[] = [];

  category_id: any[] = [];
  brand_id: any[] = [];
  material_id: any[] = [];
  origin_id: any[] = [];
  gender: any[] = [];
  startPrice: any = null;
  endPrice: any = null;

  url_param: string = '';

  //-------------------------------
  dataAddToCart: any;
  items: any;

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
    private toastrService: ToastrService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.getAllPrdInCart();
    this.loadByProductDetail();
    this.loadByCategory();
    this.loadByBrand();
    this.loadByMaterial();
    this.loadByOrigin();
  }

  loadProductDetailByFilter(type: string, value: any) {
    this.setValueFilter(type, value);
    this.setUrlParam();
    if (this.url_param == '') {
      this.loadByProductDetail();
    } else {
      this.productDetailService
        .getProductDetailByFilter(this.url_param)
        .subscribe((data) => {
          if (data) {
            this.products = data;
            this.setSortProduct(this.sort_value);
          }
        });
    }
  }

  setValueFilter(type: string, value: any) {
    if (type == this.TYPE_FILTER.CATEGORY) {
      const index = this.category_id.findIndex((n) => n == value);
      if (index > -1) {
        this.category_id.splice(index, 1);
      } else {
        this.category_id.push(value);
      }
    } else if (type == this.TYPE_FILTER.BRAND) {
      const index = this.brand_id.findIndex((n) => n == value);
      if (index > -1) {
        this.brand_id.splice(index, 1);
      } else {
        this.brand_id.push(value);
      }
    } else if (type == this.TYPE_FILTER.MATERIAL) {
      const index = this.material_id.findIndex((n) => n == value);
      if (index > -1) {
        this.material_id.splice(index, 1);
      } else {
        this.material_id.push(value);
      }
    } else if (type == this.TYPE_FILTER.ORIGIN) {
      const index = this.origin_id.findIndex((n) => n == value);
      if (index > -1) {
        this.origin_id.splice(index, 1);
      } else {
        this.origin_id.push(value);
      }
    } else if (type == this.TYPE_FILTER.GENDER) {
      const index = this.gender.findIndex((n) => n == value);
      if (index > -1) {
        this.gender.splice(index, 1);
      } else {
        this.gender.push(value);
      }
    } else if (type == this.TYPE_FILTER.START_PRICE) {
      this.startPrice = value;
    } else if (type == this.TYPE_FILTER.END_PRICE) {
      this.endPrice = value;
    }
  }

  setUrlParam() {
    this.url_param = '';
    for (const c of this.category_id) {
      this.url_param += 'category_id=' + c + '&';
    }
    for (const b of this.brand_id) {
      this.url_param += 'brand_id=' + b + '&';
    }
    for (const m of this.material_id) {
      this.url_param += 'material_id=' + m + '&';
    }
    for (const o of this.origin_id) {
      this.url_param += 'origin_id=' + o + '&';
    }
    for (const g of this.gender) {
      this.url_param += 'gender=' + g + '&';
    }
    if (this.startPrice != null && this.endPrice != null) {
      this.url_param +=
        'startPrice=' + this.startPrice + '&endPrice=' + this.endPrice;
    }
  }

  loadByProductDetail() {
    this.productDetailService.getAllProductDetail().subscribe((data: any) => {
      if (data) {
        data = data.filter((n: { status: number }) => n.status == 1);
        this.products = data;
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

  onSubmitFilterPrice() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;

    this.startPrice = this.formGroup.getRawValue().startPrice;
    this.endPrice = this.formGroup.getRawValue().endPrice;

    this.setUrlParam();
    this.productDetailService
      .getProductDetailByFilter(this.url_param)
      .subscribe((data) => {
        if (data) {
          this.products = data;
          console.log(data);
        }
      });
  }

  setSortProduct(type: number) {
    if (type == this.TYPE_SORT.PRICE_DOWN) {
      this.sort_name = 'Giá: từ thấp đến cao';
      this.sort_value = this.TYPE_SORT.PRICE_DOWN;
      this.products.sort((a, b) => (a.price < b.price ? -1 : 1));
    } else if (type == this.TYPE_SORT.PRICE_UP) {
      this.sort_name = 'Giá: từ cao đến thấp';
      this.sort_value = this.TYPE_SORT.PRICE_UP;
      this.products.sort((a, b) => (a.price > b.price ? -1 : 1));
    }
  }

  //----------------------------------------------------------
  addToCart(raw: any) {
    console.log(raw);
    if (this.items != null){
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
        id: 164,
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
    this.apiCart.findAllByCustomerId(164).subscribe({
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
}
