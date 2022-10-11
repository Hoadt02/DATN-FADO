import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../shared/Constants";
import {PromotionalService} from "../../../shared/services/api-service-impl/promotional.service";

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

  formGroup = this.fb.group({
    id: [""],
    name: ["", []],
    discount: ["", []],
    type: ["", []],
    startDate: [new Date()],
    endDate: [new Date()],
    status: [""],
    staff: this.fb.group({
      id: [4]
    }),
    description: ["", []],
  });
  range = this.fb.group({
    startDate: [new Date(), Validators.required],
    endDate: [new Date(), Validators.required],
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
      }
    }
  }

  save() {
    console.log(this.formGroup.getRawValue());
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }

    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.promotionalService.create(this.formGroup.getRawValue());
    } else {
      this.promotionalService.update(this.dataDiaLog.row.id, this.formGroup.getRawValue());
    }
    this.promotionalService.isCloseDialog.subscribe((data) => {
      if (data) {
        this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        this.promotionalService.isCloseDialog.next(false);
      }
    });
  }

  close() {
    this.matDialogRef.close();
  }

}
