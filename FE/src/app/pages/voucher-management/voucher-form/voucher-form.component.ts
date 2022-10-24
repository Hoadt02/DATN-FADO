import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constants} from '../../../shared/Constants';
import {checkDate, checkSpace, checkTypeDiscount} from '../../../shared/validator/validatorForm';
import {VoucherService} from "../../../shared/services/api-service-impl/voucher.service";

@Component({
  selector: 'app-voucher-form',
  templateUrl: './voucher-form.component.html',
  styleUrls: ['./voucher-form.component.scss']
})
export class VoucherFormComponent implements OnInit {

  isLoading = false;
  title: String;
  data: any = {};

  formGroup = this.fb.group({
    id: [''],
    startDate: [new Date()],
    endDate: [new Date()],
    discount: ['', [Validators.required, Validators.min(1)]],
    quantity:['', [Validators.required, Validators.min(1)]],
    description: [''],
    status: [1],
    type: [false],
    staff: this.fb.group({
      id: [164]
    }),
  }, {
    validators: checkTypeDiscount('type', 'discount'),
  });
  range = this.fb.group({
    startDate: [new Date(), Validators.required],
    endDate: [new Date(), Validators.required],
  }, {
    validators: checkDate('startDate', 'endDate')
  })

  constructor(
    private fb: FormBuilder,
    private voucherService: VoucherService,
    private matDialogRef: MatDialogRef<VoucherFormComponent>,
    @Inject(MAT_DIALOG_DATA) private dataDiaLog?: any,
  ) {
  }

  ngOnInit(): void {
    this.setTitleForm();
  }

  setTitleForm() {
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.title = "Thêm mới Voucher";
    } else {
      this.title = "Chỉnh sửa Voucher";
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
      console.log('Có lỗi rồi');
      return;
    }

    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.voucherService.create(this.data);
    } else {
      this.voucherService.update(this.dataDiaLog.row.id, this.data);
    }
    this.voucherService.isCloseDialog.subscribe((data) => {
      if (data) {
        this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        this.voucherService.isCloseDialog.next(false);
        this.isLoading = false;
      }
    });
  }

  close() {
    this.matDialogRef.close();
  }

}
