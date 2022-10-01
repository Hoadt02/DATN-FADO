import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../shared/Constants";
import {CategoryFormComponent} from "../../category-management/category-form/category-form.component";
import {BrandFormComponent} from "../../brand-management/brand-form/brand-form.component";
import {OriginFormComponent} from "../../origin-management/origin-form/origin-form.component";
import {BrandService} from "../../../shared/services/api-service-impl/brand.service";
import {CategoryService} from "../../../shared/services/api-service-impl/category.service";
import {ProductService} from "../../../shared/services/api-service-impl/product.service";
import {OriginService} from "../../../shared/services/api-service-impl/origin.service";
import {MaterialService} from "../../../shared/services/api-service-impl/material.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  readonly TYPE_DIALOG = Constants.TYPE_DIALOG;
  title: string = '';
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
    quantity: [0,[Validators.required, Validators.min(1)]],
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
              private materialService: MaterialService) {
  }

  ngOnInit(): void {
    if (this.data.type == Constants.TYPE_DIALOG.NEW){
        this.title = 'THÊM MỚI SẢN PHẨM CHI TIẾT'
    }else{
        this.title = 'CẬP NHẬT SẢN PHẨM CHI TIẾT';
        this.formGroup.patchValue(this.data.row);
    }
    this.getBrandForCombobox();
    this.getMaterialForCombobox();
    this.getOriginForCombobox();
    this.getProductForCombobox();
  }

  onDismiss() {
    this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE);
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;
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

  getBrandForCombobox(){
    this.brandService.getAll().subscribe((data:any) =>{
      if (data){
        this.listBrand = data;
      }});
  }

  getProductForCombobox(){
    this.productService.getAll().subscribe((data:any) =>{
      if (data){
        this.listProduct = data;
      }});
  }

  getOriginForCombobox() {
    this.originService.getAll().subscribe((data: any) => {
      if (data){
        this.listOrigin = data;
      }});
  }

  getMaterialForCombobox(){
    this.materialService.getAll().subscribe((data:any) =>{
      if (data){
        this.listMaterial = data;
      }});
  }
}
