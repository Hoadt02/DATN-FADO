import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Constants} from '../../../shared/Constants';
import {BrandService} from '../../../shared/services/api-service-impl/brand.service';
import {ProductService} from '../../../shared/services/api-service-impl/product.service';
import {OriginService} from '../../../shared/services/api-service-impl/origin.service';
import {MaterialService} from '../../../shared/services/api-service-impl/material.service';
import {ProductDetailsService} from '../../../shared/services/api-service-impl/product-details.service';
import {UploadImageService} from '../../../shared/services/api-service-impl/upload-image.service';
import {ToastrService} from 'ngx-toastr';
import {ImageService} from '../../../shared/services/api-service-impl/image.service';
import {checkSpace} from '../../../shared/validator/validatorForm';
import {Regex} from '../../../shared/validator/regex';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  readonly TYPE_DIALOG = Constants.TYPE_DIALOG;
  title = '';
  isLoading = false;

  listProduct: any[] = [];
  listBrand: any[] = [];
  listOrigin: any[] = [];
  listMaterial: any[] = [];
  listImageProductDetail: any[] = [];

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
    name: ['', [checkSpace, Validators.pattern(Regex.name), Validators.minLength(4)]],
    price: ['', [Validators.required, Validators.min(10000)]],
    quantity: ['', [Validators.required, Validators.min(1)]],
    gender: ['', [Validators.required]],
    imei: [''],
    avatar: [''],
    createDate: [''],
    description: ['', [checkSpace]],
    status: ['', [Validators.required]]
  });

  files: File[] = [];
  fileAvt: File[] = [];
  showImage = true;
  showImageDetail = true;

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
      this.showImage = false;
      this.showImageDetail = false;
      this.imageService.getImagesByIdProductDetail(this.data.row.id).subscribe(data => {
        if (data) {
          this.listImageProductDetail = data;
        }
      });
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
    if (this.fileAvt.length >= 1) { this.fileAvt.splice(0, this.fileAvt.length); }
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
      this.updateProductDetail();
    }
    this.productDetailService.isCloseDialog.subscribe(value => {
      if (value) {
        this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        this.productDetailService.isCloseDialog.next(false);
      }
    })
  }

  createProductDetail() {
    // Create avatar
    const avtData = new FormData();
    avtData.append('file', this.fileAvt[0]);
    this.uploadImageService.uploadImage(avtData, 'avtProduct').subscribe({
      next: (data) => {
        this.formGroup.patchValue({avatar: data.name});
        // Create product detail
        this.productDetailService.createProductDetail(this.formGroup.getRawValue());
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error('Lỗi thêm mới Avatar sản phẩm!')
        return;
      }
    });

    // Create list image product detail
    const listImg = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      listImg.append('file', this.files[i]);
    }
    this.productDetailService.idProductDetail.subscribe(id => {
      if (id) {
        this.uploadImageService.uploadImageDetail(listImg, 'imgDetailProduct').subscribe({
          next: (data) => {
            for (let i = 0; i < data.length; i++) {
              const image = this.fb.group({
                name: [data[i]],
                productDetail: this.fb.group({
                  id: id
                })
              });
              this.imageService.createImage(image.value);
            }
          },
          error: (error) => {
            console.log(error);
            this.toastrService.error('Thêm hình ảnh chi tiết của sản phẩm thất bại');
          },
          complete: () => {
            console.log('Đã chạy vào đây nhé');
            this.productDetailService.idProductDetail.next(null);
          }
        })
      }
    });
  }

  updateProductDetail() {
    if (this.showImage == true && this.showImageDetail == false) {
      const avtData = new FormData();
      avtData.append('file', this.fileAvt[0]);
      this.uploadImageService.uploadImage(avtData, 'avtProduct').subscribe({
        next: (data) => {
          this.formGroup.patchValue({avatar: data.name});
          // Update product detail
          this.productDetailService.updateProductDetail(this.formGroup.getRawValue(), this.formGroup.getRawValue().id);
        },
        error: (error) => {
          console.log(error);
          this.toastrService.error('Lỗi cập nhật Avatar sản phẩm!')
          return;
        }
      });

    } else if (this.showImage == false && this.showImageDetail == true) {
      // Xóa ảnh chi tiết sản phẩm hiện tại
      this.imageService.deleteImage(this.formGroup.getRawValue().id);

      // Thêm ảnh chi tiết sản phẩm mới vào
      const listImg = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        listImg.append('file', this.files[i]);
      }
      this.uploadImageService.uploadImageDetail(listImg, 'imgDetailProduct').subscribe({
        next: (data) => {
          for (let i = 0; i < data.length; i++) {
            const image = this.fb.group({
              name: [data[i]],
              productDetail: this.fb.group({
                id: this.formGroup.getRawValue().id
              })
            });
            this.imageService.createImage(image.value);
          }
        },
        error: (error) => {
          console.log(error);
          this.toastrService.error('Thêm hình ảnh chi tiết của sản phẩm thất bại');
        }
      });

      // Cập nhật sản phẩm chi tiết
      this.productDetailService.updateProductDetail(this.formGroup.getRawValue(), this.formGroup.getRawValue().id);

    } else if (this.showImage == true && this.showImageDetail == true) {
      // Xóa ảnh chi tiết sản phẩm hiện tại
      this.imageService.deleteImage(this.formGroup.getRawValue().id);

      // Cập nhật lại avt product
      const avtData = new FormData();
      avtData.append('file', this.fileAvt[0]);
      this.uploadImageService.uploadImage(avtData, 'avtProduct').subscribe({
        next: (data) => {
          this.formGroup.patchValue({avatar: data.name});
          //Cập nhật sản phẩm chi tiết
          this.productDetailService.updateProductDetail(this.formGroup.getRawValue(), this.formGroup.getRawValue().id);
        },
        error: (error) => {
          console.log(error);
          this.toastrService.error('Lỗi cập nhật Avatar sản phẩm!')
          return;
        }
      });

      // Thêm ảnh chi tiết sản phẩm mới vào
      const listImg = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        listImg.append('file', this.files[i]);
      }
      this.uploadImageService.uploadImageDetail(listImg, 'imgDetailProduct').subscribe({
        next: (data) => {
          for (let i = 0; i < data.length; i++) {
            const image = this.fb.group({
              name: [data[i]],
              productDetail: this.fb.group({
                id: this.formGroup.getRawValue().id
              })
            });
            this.imageService.createImage(image.value);
          }
        },
        error: (error) => {
          console.log(error);
          this.toastrService.error('Thêm hình ảnh chi tiết của sản phẩm thất bại');
        }
      });
    } else {
      this.productDetailService.updateProductDetail(this.formGroup.getRawValue(), this.formGroup.getRawValue().id);
    }
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
}
