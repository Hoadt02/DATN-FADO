import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BrandService} from '../../../shared/services/api-service-impl/brand.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constants} from '../../../shared/Constants';
import {MaterialService} from '../../../shared/services/api-service-impl/material.service';
import {checkSpace} from '../../../shared/validator/validatorForm';
import {Regex} from '../../../shared/validator/regex';

@Component({
  selector: 'app-voucher-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss']
})
export class MaterialFormComponent implements OnInit {

  title: string;

  formGroup: FormGroup = this.fb.group({
    id: '',
    name: ['', [checkSpace, Validators.pattern(Regex.name), Validators.maxLength(50)]],
    status: [1]
  })
  constructor(private fb: FormBuilder,
              private toastrService: ToastrService,
              private brandService: BrandService,
              private matDialogRef: MatDialogRef<MaterialFormComponent>,
              private materialserive: MaterialService,
              @Inject(MAT_DIALOG_DATA) private dataDiaLog?: any) { }

  ngOnInit(): void {
    this.setTitleForm();
  }

  setTitleForm() {
    // tslint:disable-next-line:triple-equals
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.title = 'Thêm mới chất liệu';
    } else {
      this.title = 'Chỉnh sửa chất liệu';
      this.formGroup.patchValue(this.dataDiaLog.row)
    }
  }

  onDismiss() {
    this.matDialogRef.close();
  }

  onSubmit() {
    console.log(this.formGroup.getRawValue());
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    // tslint:disable-next-line:triple-equals
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.materialserive.create(this.formGroup.getRawValue());
    } else {
      this.materialserive.update(this.dataDiaLog.row.id, this.formGroup.getRawValue());
    }
    this.materialserive.isCloseDialog.subscribe(data => {
      if (data) {
        this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        this.materialserive.isCloseDialog.next(false);
      }
    })
  }
}
