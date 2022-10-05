import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BrandService} from '../../../shared/services/api-service-impl/brand.service';
import {Constants} from '../../../shared/Constants';
import {checkSpace} from '../../../shared/validator/validatorForm';
import {Regex} from '../../../shared/validator/regex';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss']
})
export class BrandFormComponent implements OnInit {

  title: string;

  formGroup: FormGroup = this.fb.group({
    id: '',
    name: ['', [Validators.required, checkSpace, Validators.pattern(Regex.name)]],
  })

  constructor(private fb: FormBuilder,
              private toastrService: ToastrService,
              private brandService: BrandService,
              private matDialogRef: MatDialogRef<BrandFormComponent>,
              @Inject(MAT_DIALOG_DATA) private dataDiaLog?: any) {
  }

  ngOnInit(): void {
    this.setTitleForm();
  }

  setTitleForm() {
    // tslint:disable-next-line:triple-equals
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.title = 'Thêm mới thương hiệu';
    } else {
      this.title = 'Chỉnh sửa thương hiệu';
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

    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.brandService.create(this.formGroup.getRawValue()).subscribe({
        next: (data) => {
          console.log(data);
          this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
          this.toastrService.success('Thêm mới thương hiệu thành công');
        },
        error: (error) => {
          console.log(error);
          if (error.error.code == 'UNIQUE') {
            this.toastrService.warning(error.error.message);
            return;
          }
          this.toastrService.error('Thêm mới thương hiệu thất bại !');
        }
      });
    } else {
      this.brandService.update(this.formGroup.getRawValue()).subscribe({
        next: (data) => {
          console.log(data);
          this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
          this.toastrService.success('Cập nhật thương hiệu thành công');
        },
        error: (error) => {
          console.log(error);
          if (error.error.code == 'UNIQUE') {
            this.toastrService.warning(error.error.message);
            return;
          }
          this.toastrService.error('Câp nhật thương hiệu thất bại !');
        }
      });
    }
  }
}
