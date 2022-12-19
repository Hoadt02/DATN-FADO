import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../shared/Constants";
import {PromotionalService} from "../../../shared/services/api-service-impl/promotional.service";
import {
  checkDate,
  checkMinDate,
  checkSpace,
  checkTypeDiscount
} from "../../../shared/validator/validatorForm";
import {ToastrService} from "ngx-toastr";
import {StorageService} from "../../../shared/services/jwt/storage.service";

@Component({
  selector: 'app-promotional-form',
  templateUrl: './promotional-form.component.html',
  styleUrls: ['./promotional-form.component.scss']
})
export class PromotionalFormComponent implements OnInit {

  isLoading = false;
  title: String = '';
  hide = true;
  hidePassword = true;
  data: any = {};

  formGroup = this.fb.group({
    id: [''],
    name: ['', [checkSpace, Validators.maxLength(255)]],
    discount: ['', [Validators.required, Validators.min(1)]],
    type: [true],
    startDate: [new Date()],
    endDate: [new Date()],
    status: [1],
    staff: this.fb.group({
      id: [this.storageService.getIdFromToken()]
    }),
    description: [''],
  }, {
    validators: checkTypeDiscount('type', 'discount'),
  });
  range = this.fb.group({
    startDate: [new Date(), [Validators.required, this.title === 'Thêm mới khuyến mại' ? checkMinDate : Validators.required]],
    endDate: [new Date(), Validators.required],
  }, {
    validators: checkDate('startDate', 'endDate')
  })

  constructor(
    private fb: FormBuilder,
    private promotionalService: PromotionalService,
    private storageService: StorageService,
    private toastrService: ToastrService,
    private matDialogRef: MatDialogRef<PromotionalFormComponent>,
    @Inject(MAT_DIALOG_DATA) private dataDiaLog?: any,
  ) {
  }

  ngOnInit(): void {
    this.setTitleForm();
  }

  setTitleForm() {
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.title = "Thêm mới khuyến mại";
    } else {
      this.title = "Chỉnh sửa khuyến mại";
      this.hidePassword = false;
      if (this.dataDiaLog.row) {
        this.formGroup.patchValue(this.dataDiaLog.row);
        this.range.patchValue(this.dataDiaLog.row);
      }
    }
  }

  save() {
    this.data = this.formGroup.getRawValue();
    this.data.startDate = this.range.getRawValue().startDate;
    this.data.endDate = this.range.getRawValue().endDate;

    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    if (this.range.invalid) {
      return;
    }

    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.isLoading = true;
      this.promotionalService.create(this.data).subscribe({
        next: (data: any) => {
          this.toastrService.success('Thêm khuyến mại thành công!');
          this.isLoading = false;
          this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        }, error: err => {
          console.log(err);
          if (err.error.code == 'UNIQUE') {
            this.toastrService.warning(err.error.message);
            this.isLoading = false;
            return;
          }
          this.toastrService.error('Thêm khuyến mại thất bại!');
        }
      });
    } else {
      this.isLoading = true;
      this.promotionalService.update(this.dataDiaLog.row.id, this.data).subscribe({
        next: (data: any) => {
          this.toastrService.success('Cập nhật khuyến mại thành công!');
          this.isLoading = false;
          this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        }, error: err => {
          console.log(err);
          if (err.error.code == 'UNIQUE') {
            this.toastrService.warning(err.error.message);
            this.isLoading = false;
            return;
          }
          this.toastrService.error('Cập nhật khuyến mại thất bại!');
        }
      });
    }
  }

  close() {
    this.matDialogRef.close();
  }

}
