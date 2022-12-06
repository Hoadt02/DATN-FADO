import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Constants} from '../../../shared/Constants';
import {checkSpace} from '../../../shared/validator/validatorForm';
import {Regex} from '../../../shared/validator/regex';
import {FaceDiameterService} from '../../../shared/services/api-service-impl/faceDiameter.service';

@Component({
  selector: 'app-battery-power-form',
  templateUrl: './face-diameter-form.component.html',
  styleUrls: ['./face-diameter-form.component.scss']
})
export class FaceDiameterFormComponent implements OnInit {

  title: string;

  formGroup = this.fb.group(
    {
      id : [''],
      name: ['', [checkSpace , Validators.maxLength(50)]],
      status: 1
    }
  )

  constructor(
    private fb: FormBuilder,
    private readonly faceDiameterService: FaceDiameterService,
    private matDialogRef: MatDialogRef<FaceDiameterFormComponent>,
    @Inject(MAT_DIALOG_DATA) private dataDiaLog?: any,
  ) { }

  ngOnInit(): void {
    if (this.dataDiaLog.row) {
      console.log(this.dataDiaLog.row)
      this.formGroup.patchValue(this.dataDiaLog.row);
    }
    this.setTitle();
  }

  onDismiss() {
      this.matDialogRef.close();
  }

  setTitle() {
    // tslint:disable-next-line:triple-equals
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.title = 'Thêm mặt kính';
    } else {
      this.title = 'Sửa mặt kính';
    }
  }

  onSubmit() {
    console.log(this.formGroup.getRawValue());
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      console.log('có lỗi');
      return;
    }
    // tslint:disable-next-line:triple-equals
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.faceDiameterService.create(this.formGroup.getRawValue());
    } else {
      this.faceDiameterService.update(this.dataDiaLog.row.id, this.formGroup.getRawValue());
    }
    this.faceDiameterService.isCloseDialog.subscribe(data => {
      if (data) {
        this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        this.faceDiameterService.isCloseDialog.next(false);
      }
    })
  }
}
