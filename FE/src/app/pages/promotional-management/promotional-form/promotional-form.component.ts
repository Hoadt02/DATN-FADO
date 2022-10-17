import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../shared/Constants";
import {PromotionalService} from "../../../shared/services/api-service-impl/promotional.service";
import {checkDate, checkSpace, checkTypeDiscount} from "../../../shared/validator/validatorForm";

@Component({
  selector: 'app-promotional-form',
  templateUrl: './promotional-form.component.html',
  styleUrls: ['./promotional-form.component.scss']
})
export class PromotionalFormComponent implements OnInit {

  isLoading = false;
  title: String;
  hide = true;
  hidePassword = true;
  data: any = {};

  formGroup = this.fb.group({
    id: [''],
    name: ['', [checkSpace]],
    discount: ['', [Validators.required, Validators.min(1)]],
    type: [false],
    startDate: [new Date()],
    endDate: [new Date()],
    status: [1],
    staff: this.fb.group({
      id: [164]
    }),
    description: [''],
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
    private promotionalService: PromotionalService,
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
      console.log('Có lỗi rồi');
      return;
    }

    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.isLoading = true;
      this.promotionalService.create(this.data);
    } else {
      this.isLoading = true;
      this.promotionalService.update(this.dataDiaLog.row.id, this.data);
    }
    this.promotionalService.isCloseDialog.subscribe((data) => {
      if (data) {
        this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        this.promotionalService.isCloseDialog.next(false);
        this.isLoading = false;
      }
    });
  }

  close() {
    this.matDialogRef.close();
  }

}
