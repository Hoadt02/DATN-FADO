import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../shared/services/api-service-impl/category.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constants} from '../../../shared/Constants';
import {ToastrService} from 'ngx-toastr';
import {checkSpace} from '../../../shared/validator/validatorForm';
import {Regex} from '../../../shared/validator/regex';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  title: string;

  formGroup: FormGroup = this.fb.group({
    id: '',
    name: ['', [checkSpace, Validators.pattern(Regex.name), Validators.maxLength(255)]],
    status: [1]
  })

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private toastrService: ToastrService,
              private matDialogRef: MatDialogRef<CategoryFormComponent>,
              @Inject(MAT_DIALOG_DATA) private dataDiaLog?: any) {
  }

  ngOnInit(): void {
    this.setTitleForm();
  }

  setTitleForm() {
    // tslint:disable-next-line:triple-equals
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.title = 'Thêm mới danh mục';
    } else {
      this.title = 'Chỉnh sửa danh mục';
      this.formGroup.patchValue(this.dataDiaLog.row)
    }
  }

  onDismiss() {
    this.matDialogRef.close();
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    // tslint:disable-next-line:triple-equals
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.categoryService.create(this.formGroup.getRawValue()).subscribe({
        next: (data) => {
          console.log(data);
          this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
          this.toastrService.success('Thêm mới danh mục thành công');
        },
        // tslint:disable-next-line:no-shadowed-variable
        error: (error) => {
          console.log(error);
          if (error.error.code == 'UNIQUE') {
            this.toastrService.warning(error.error.message);
            return;
          }
          this.toastrService.error('Thêm mới danh mục thất bại !');
        }
      });
    } else {
      this.categoryService.update(this.formGroup.getRawValue()).subscribe({
        next: (data) => {
          console.log(data);
          this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
          this.toastrService.success('Cập nhật danh mục thành công')
        },
        // tslint:disable-next-line:no-shadowed-variable
        error: (error) => {
          console.log(error);
          if (error.error.code == 'UNIQUE') {
            this.toastrService.warning(error.error.message);
            return;
          }
          this.toastrService.error('Cập nhật danh mục thất bại!');
        }
      });
    }
  }
}
