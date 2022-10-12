import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {checkSpace} from "../../../shared/validator/validatorForm";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../shared/Constants";
import {ProductService} from "../../../shared/services/api-service-impl/product.service";
import {CategoryService} from "../../../shared/services/api-service-impl/category.service";

@Component({
  selector: 'app-product-line-form',
  templateUrl: './product-line-form.component.html',
  styleUrls: ['./product-line-form.component.scss']
})
export class ProductLineFormComponent implements OnInit {

  title: string;
  listCategory: any[] = [];

  formGroup: FormGroup = this.fb.group({
    id: '',
    category: this.fb.group({
      id: ['', Validators.required]
    }),
    name: ['', [checkSpace, Validators.maxLength(255)]],
    description: ['', checkSpace],
    createDate: new Date(),
    status: [1],
  })

  constructor(private fb: FormBuilder,
              private toastrService: ToastrService,
              private productService: ProductService,
              private categoryService: CategoryService,
              private matDialogRef: MatDialogRef<ProductLineFormComponent>,
              @Inject(MAT_DIALOG_DATA) private dataDiaLog?: any) {
  }

  ngOnInit(): void {
    this.setTitleForm();
    this.getCategory();
  }

  setTitleForm() {
    // tslint:disable-next-line:triple-equals
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.title = 'Thêm mới dòng sản phẩm';
    } else {
      this.title = 'Chỉnh sửa dòng sản phẩm';
      this.formGroup.patchValue(this.dataDiaLog.row)
    }

  }

  cbbCategory() {
    this.categoryService.getAll().subscribe(data => {
      // @ts-ignore
      this.categories = data as any[];
    })
  }

  getCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      if (data) {
        this.listCategory = data;
      }
    });
  }

  onDismiss() {
    this.matDialogRef.close();
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }

    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.productService.create(this.formGroup.getRawValue()).subscribe({
        next: (data) => {
          console.log(data);
          this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
          this.toastrService.success('Thêm mới sản phẩm thành công');
        },
        error: (error) => {
          console.log(error);
          if (error.error.code == 'UNIQUE') {
            this.toastrService.warning(error.error.message);
            return;
          }
          this.toastrService.error('Thêm mới sản phẩm thất bại !');
        }
      });
    } else {
      this.productService.update(this.formGroup.getRawValue()).subscribe({
        next: (data) => {
          console.log(data);
          this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
          this.toastrService.success('Cập nhật sản phẩm thành công');
        },
        error: (error) => {
          console.log(error);
          this.toastrService.error('Câp nhật sản phẩm thất bại !');
        }
      });
    }
  }

}
