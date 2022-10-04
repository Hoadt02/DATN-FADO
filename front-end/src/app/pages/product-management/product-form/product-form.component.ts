import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../shared/Constants";
import {CategoryFormComponent} from "../../category-management/category-form/category-form.component";
import {BrandFormComponent} from "../../brand-management/brand-form/brand-form.component";
import {OriginFormComponent} from "../../origin-management/origin-form/origin-form.component";
import {BrandService} from "../../../shared/services/api-service-impl/brand.service";
import {ProductService} from "../../../shared/services/api-service-impl/product.service";
import {OriginService} from "../../../shared/services/api-service-impl/origin.service";
import {MaterialService} from "../../../shared/services/api-service-impl/material.service";
import {ProductDetailsService} from "../../../shared/services/api-service-impl/product-details.service";
import {UploadImageService} from "../../../shared/services/api-service-impl/upload-image.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  readonly TYPE_DIALOG = Constants.TYPE_DIALOG;
  title: string = '';
  isLoading = true;

  listProduct: any[] = [];
  listBrand: any[] = [];
  listOrigin: any[] = [];
  listMaterial: any[] = [];

  formGroup: FormGroup = this.fb.group({
    id: [''],
    product: this.fb.group({
      id: ['', [Validators.required]]
    }),
    brand: this.fb.group({
      id: ['', [Validators.required]]
    }),
    material: this.fb.group({
      id: ['', [Validators.required]]
    }),
    origin: this.fb.group({
      id: ['', [Validators.required]],
    }),
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: [0, [Validators.required, Validators.min(10000)]],
    quantity: [0, [Validators.required, Validators.min(1)]],
    gender: ['', [Validators.required]],
    imei: [''],
    avatar: [''],
    createDate: [''],
    description: ['', [Validators.required]],
    status: ['', [Validators.required]]
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ProductFormComponent>,
              private fb: FormBuilder,
              private dialogService: MatDialog,
              private brandService: BrandService,
              private productService: ProductService,
              private originService: OriginService,
              private materialService: MaterialService,
              private productDetailService: ProductDetailsService,
              private uploadImageService: UploadImageService) {
  }

  ngOnInit(): void {
    if (this.data.type == Constants.TYPE_DIALOG.NEW) {
      this.title = 'THÊM MỚI SẢN PHẨM CHI TIẾT'
    } else {
      this.title = 'CẬP NHẬT SẢN PHẨM CHI TIẾT';
      this.formGroup.patchValue(this.data.row);
    }
    this.getProductForCombobox();
    this.getBrandForCombobox();
    this.getMaterialForCombobox();
    this.getOriginForCombobox();
  }

  files: File[] = [];
  fileAvt: File[] = [];

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onSelectAvt(event) {
    if (this.fileAvt.length >= 1) this.fileAvt.splice(0,this.fileAvt.length);
    this.fileAvt = event.addedFiles;
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onRemoveAvt() {
    console.log(this.fileAvt.length);
    this.fileAvt.splice(0, 1);
  }

  onDismiss() {
    this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE);
  }

  onSubmit() {
    const data = new FormData();
    data.append("file", this.fileAvt[0]);
    this.uploadImageService.uploadImage(data, 'avtProduct');
    this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
    // this.formGroup.markAllAsTouched();
    // if (this.formGroup.invalid) return;
    // this.isLoading = true;
    // if (this.data.type == this.TYPE_DIALOG.NEW) {
    //   this.productDetailService.createProductDetail(this.formGroup.getRawValue());
    // } else {
    //   this.productDetailService.updateProductDetail(this.formGroup.getRawValue(), this.formGroup.getRawValue().id);
    // }
    // this.productDetailService.isCloseDialog.subscribe(value => {
    //   if (value){
    //     this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
    //     this.productDetailService.isCloseDialog.next(false);
    //   }
    // })
  }

  createCategory() {
    this.dialogService.open(CategoryFormComponent);
  }

  createProduct() {
    this.dialogService.open(ProductFormComponent);
  }

  createBrand() {
    this.dialogService.open(BrandFormComponent);
  }

  createOrigin() {
    this.dialogService.open(OriginFormComponent);
  }

  getBrandForCombobox() {
    this.isLoading = true;
    this.brandService.getAll().subscribe((data: any) => {
      if (data) {
        this.listBrand = data;
      }
    });
  }

  getProductForCombobox() {
    this.productService.getAll().subscribe((data: any) => {
      if (data) {
        this.listProduct = data;
        this.isLoading = false;
      }
    });
  }

  getOriginForCombobox() {
    this.originService.getAll().subscribe((data: any) => {
      if (data) {
        this.listOrigin = data;
      }
    });
  }

  getMaterialForCombobox() {
    this.materialService.getAll().subscribe((data: any) => {
      if (data) {
        this.listMaterial = data;
      }
    });
  }
}
