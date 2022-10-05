import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../shared/Constants";
import {BrandService} from "../../../shared/services/api-service-impl/brand.service";
import {ProductService} from "../../../shared/services/api-service-impl/product.service";
import {OriginService} from "../../../shared/services/api-service-impl/origin.service";
import {MaterialService} from "../../../shared/services/api-service-impl/material.service";
import {ProductDetailsService} from "../../../shared/services/api-service-impl/product-details.service";
import {UploadImageService} from "../../../shared/services/api-service-impl/upload-image.service";
import {ToastrService} from "ngx-toastr";
import {ImageService} from "../../../shared/services/api-service-impl/image.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  readonly TYPE_DIALOG = Constants.TYPE_DIALOG;
  title: string = '';
  isLoading = false;

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
    price: ['', [Validators.required, Validators.min(10000)]],
    quantity: ['', [Validators.required, Validators.min(1)]],
    gender: ['', [Validators.required]],
    imei: [''],
    avatar: [''],
    createDate: [''],
    description: ['', [Validators.required]],
    status: ['', [Validators.required]]
  });

  files: File[] = [];
  fileAvt: File[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ProductFormComponent>,
              private fb: FormBuilder,
              private dialogService: MatDialog,
              private brandService: BrandService,
              private productService: ProductService,
              private originService: OriginService,
              private materialService: MaterialService,
              private productDetailService: ProductDetailsService,
              private uploadImageService: UploadImageService,
              private toastrService: ToastrService,
              private imageService: ImageService) {
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

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onSelectAvt(event) {
    if (this.fileAvt.length >= 1) this.fileAvt.splice(0, this.fileAvt.length);
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
    // if (this.formGroup.invalid) return;
    this.isLoading = true;
    if (this.data.type == this.TYPE_DIALOG.NEW) {
      this.createProductDetail();
    } else {
      this.productDetailService.updateProductDetail(this.formGroup.getRawValue(), this.formGroup.getRawValue().id);
    }
    this.productDetailService.isCloseDialog.subscribe(value => {
      if (value) {
        this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        this.productDetailService.isCloseDialog.next(false);
      }
    })
  }

  createProductDetail() {
    //Create avatar
    const avtData = new FormData();
    avtData.append("file", this.fileAvt[0]);
    this.uploadImageService.uploadImage(avtData, 'avtProduct').subscribe({
      next: (data) => {
        this.formGroup.patchValue({avatar: data.name});
        //Create product detail
        this.productDetailService.createProductDetail(this.formGroup.getRawValue());
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error('Lỗi thêm mới Avatar sản phẩm!')
        return;
      }
    });

    //Create list image product detail
    const listImg = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      listImg.append("file", this.files[i]);
    }
    this.productDetailService.idProductDetail.subscribe(id => {
      this.uploadImageService.uploadImageDetail(listImg, 'imgDetailProduct').subscribe({
        next: (data) => {
          if (id) {
            for (let i = 0; i < data.length; i++) {
              const image = this.fb.group({
                name: [data[i]],
                productDetail: this.fb.group({
                  id: id
                })
              });
              this.imageService.createImage(image.value);
            }
          }
        },
        error: (error) => {
          console.log(error);
          this.toastrService.error('Thêm hình ảnh chi tiết của sản phẩm thất bại');
        }
      });
    });
  }

  getBrandForCombobox() {
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

  touchedAll() {
     this.formGroup.markAllAsTouched();
  }
}
