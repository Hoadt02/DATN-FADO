import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../shared/service/api-service-impl/category.service';
import {BrandService} from '../../shared/service/api-service-impl/brand.service';
import {MaterialService} from '../../shared/service/api-service-impl/material.service';
import {OriginService} from '../../shared/service/api-service-impl/origin.service';
import {ProductDetailsService} from '../../shared/service/api-service-impl/product-details.service';
import {Contants} from '../../shared/Contants';
import {FormBuilder, Validators} from '@angular/forms';
import {CartService} from '../../shared/service/api-service-impl/cart.service';
import {checkCheckPrice} from '../../shared/validator/validate';
import {ToastrService} from "ngx-toastr";
import {StorageService} from "../../shared/service/jwt/storage.service";
import {Router} from "@angular/router";
import {ProductPromotionalService} from "../../shared/service/api-service-impl/product-promotional.service";
import {WaterProofService} from "../../shared/service/api-service-impl/waterProof.service";
import {FaceDiameterService} from "../../shared/service/api-service-impl/faceDiameter.service";
import {BatteryPowerService} from "../../shared/service/api-service-impl/batteryPower.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  readonly TYPE_SORT = Contants.TYPE_SORT;
  readonly TYPE_SHOW = Contants.TYPE_SHOW;
  readonly TYPE_FILTER = Contants.TYPE_FILTER;
  isLoading!: boolean;

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
  waterproof: any[] = [];
  facediameter: any[] = [];
  batterypower: any[] = [];
  products: any[] = [];
  productPromotionalCurrent: any[] = [];

  // params filter
  search = null;
  category_id: any[] = [];
  brand_id: any[] = [];
  material_id: any[] = [];
  waterproof_id: any[] = [];
  facediameter_id: any[] = [];
  batterypower_id: any[] = [];
  origin_id: any[] = [];
  gender: any[] = [];

  //name page
  name = 'Tất cả sản phẩm';

  //count nam nữ
  countMale = 0;
  countFemale = 0;

  // checked input from homepage
  checkedCheckboxCate = -1;
  checkedCheckboxGender = -1;

  //-------------------------------
  dataAddToCart: any;
  items: any;
  productPromotionals: any;

  //-------------------------------

  formGroup = this.fb.group(
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
    private router: Router,
    private waterproofService: WaterProofService,
    private facediameterService: FaceDiameterService,
    private batterypowerService: BatteryPowerService
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
    this.loadByWaterproof();
    this.loadByFacediameter();
    this.loadByBatterypower();
    this.loadCountProductMale();
    this.loaCountProductFemale();
  }

  //check data search
  checkDataSearch() {
    this.productDetailService.dataSearchFromHeader.subscribe( data=>{
        if (data != null) {
          this.search = data as any;
          this.name = 'Kết quả tìm kiếm của từ khóa "' + this.search + '"';
        }
    });
    this.productDetailService.dataSearchFromHeader.next(null);
  }

  //check data home page
  checkDataFromHomePage() {
    this.productDetailService.dataFromHomePage.subscribe(data => {
      if (data != null) {
        if (data.id == true || data.id == false) {
          this.gender.push(data.id);
          this.name = data.name;
          this.checkedCheckboxGender = data.id;
        } else {
          this.category_id.push(data.id);
          this.name = data.name;
          this.checkedCheckboxCate = data.id;
        }
      }
    });
    this.productDetailService.dataFromHomePage.next(null);
  }

  //check name page
  setNamePage() {
    if (this.category_id.length > 0) this.name = 'Bộ lọc';
    else if (this.brand_id.length > 0) this.name = 'Bộ lọc';
    else if (this.material_id.length > 0) this.name = 'Bộ lọc';
    else if (this.origin_id.length > 0) this.name = 'Bộ lọc';
    else if (this.waterproof_id.length > 0) this.name = 'Bộ lọc';
    else if (this.facediameter_id.length > 0) this.name = 'Bộ lọc';
    else if (this.batterypower_id.length > 0) this.name = 'Bộ lọc';
    else if (this.gender.length > 0) this.name = 'Bộ lọc';
    else if (this.formGroup.getRawValue().startPrice != null && this.formGroup.getRawValue().endPrice) this.name = 'Bộ lọc';
    else this.name = 'Tất cả sản phẩm';
  }

  // Start get value oninit
  loadByProductDetail() {
    this.isLoading = true;
    this.checkDataFromHomePage();
    this.checkDataSearch();
    this.productDetailService.findProductsWithPaginationAndSortingAndFilter(this.setData()).subscribe({
      next: (data) => {
        // set data to list product
        this.products = data.content;

        // set number of pages
        this.totalPages = [];
        for (let i = 0; i < data.totalPages; i++) {
          this.totalPages.push(i + 1);
        }

        // set data to productPromotionalCurrent
        const ids = [];
        for (let i = 0; i < data.content.length; i++) {
          ids.push(data.content[i].id);
        }
        this.apiProductPromotional.findProductPromotionalByIdProductDetail(ids).subscribe(res => {
          this.productPromotionalCurrent = res;
          this.isLoading = false;
        })
      },
      error: (_) => {
        this.isLoading = false;
      }
    });
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

  loadCountProductMale() {
    this.productDetailService.getCountProductByMale().subscribe(data => {
      this.countMale = data;
    })
  }

  loaCountProductFemale() {
    this.productDetailService.getCountProductByFemale().subscribe(data => {
      this.countFemale = data;
    })
  }

  loadByCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.productDetailService.getCountProductByCategory(data[i].id).subscribe(res => {
          data[i].count = res;
        })
      }
      this.categories = data;
    });
  }

  loadByBrand() {
    this.brandService.getAll().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.productDetailService.getCountProductByBrand(data[i].id).subscribe(res => {
          data[i].count = res;
        })
      }
      this.brands = data;
    });
  }

  loadByMaterial() {
    this.materialService.getAll().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.productDetailService.getCountProductByMaterial(data[i].id).subscribe(res => {
          data[i].count = res;
        })
      }
      this.materials = data;
    });
  }

  loadByOrigin() {
    this.originService.getAll().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.productDetailService.getCountProductByOrigin(data[i].id).subscribe(res => {
          data[i].count = res;
        })
      }
      this.origins = data;
    });
  }

  loadByWaterproof(){
    this.waterproofService.getAll().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.productDetailService.getCountProductByWaterproof(data[i].id).subscribe(res => {
          data[i].count = res;
        })
      }
      this.waterproof = data;
    });
  }

  loadByFacediameter(){
    this.facediameterService.getAll().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.productDetailService.getCountProductByFacediameter(data[i].id).subscribe(res => {
          data[i].count = res;
        })
      }
      this.facediameter = data;
    });
  }

  loadByBatterypower(){
    this.batterypowerService.getAll().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.productDetailService.getCountProductByBatterypower(data[i].id).subscribe(res => {
          data[i].count = res;
        })
      }
      this.batterypower = data;
    });
  }
  // End

  // Start set filter with click checkbox
  addValueFilter(data: any, value: any) {
    let index = data.findIndex((n: any) => n == value);
    if (index > -1) {
      data.splice(index, 1);
    } else {
      data.push(value);
    }
  }

  setValueFilter(type: string, value: any) {
    //reset data search
    this.search = null;

    if (type == this.TYPE_FILTER.CATEGORY) this.addValueFilter(this.category_id, value);
    else if (type == this.TYPE_FILTER.BRAND) this.addValueFilter(this.brand_id, value);
    else if (type == this.TYPE_FILTER.MATERIAL) this.addValueFilter(this.material_id, value);
    else if (type == this.TYPE_FILTER.ORIGIN) this.addValueFilter(this.origin_id, value);
    else if (type == this.TYPE_FILTER.GENDER) this.addValueFilter(this.gender, value);
    else if (type == this.TYPE_FILTER.WATERPROOF) this.addValueFilter(this.waterproof_id, value);
    else if (type == this.TYPE_FILTER.FACEDIAMETER) this.addValueFilter(this.facediameter_id, value);
    else if (type == this.TYPE_FILTER.BATTERYPOWER) this.addValueFilter(this.batterypower_id, value);
    this.setNamePage();
    this.loadByProductDetail();
  }
  // End

  // Start set data using load list product
  setData() {
    const data = {
      page: this.page,
      size: this.size,
      sort: this.sort,
      search: this.search,
      category_id: this.category_id,
      brand_id: this.brand_id,
      material_id: this.material_id,
      origin_id: this.origin_id,
      waterproof_id: this.waterproof_id,
      facediameter_id: this.facediameter_id,
      batterypower_id: this.batterypower_id,
      gender: this.gender,
      startPrice: this.formGroup.getRawValue().startPrice,
      endPrice: this.formGroup.getRawValue().endPrice
    }
    return data;
  }
  // End

  // submit filter price
  onSubmitFilterPrice() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;

    this.loadByProductDetail();
  }

  // Start sorting and paging
  setSortProduct(type: string) {
    if (type == this.TYPE_SORT.NEW) {
      this.sort_name = 'Sản phẩm mới nhất';
      this.page = 0;
      this.sort = 1;
      this.loadByProductDetail();
    } else if (type == this.TYPE_SORT.OLD) {
      this.sort_name = 'Sản phẩm cũ nhất';
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
