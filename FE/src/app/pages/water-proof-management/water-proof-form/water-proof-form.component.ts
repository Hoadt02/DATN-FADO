import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Constants} from '../../../shared/Constants';
import {checkSpace} from '../../../shared/validator/validatorForm';
import {Regex} from '../../../shared/validator/regex';
import {FaceDiameterService} from '../../../shared/services/api-service-impl/faceDiameter.service';
import {WaterProofService} from '../../../shared/services/api-service-impl/waterProof.service';

@Component({
  selector: 'app-battery-power-form',
  templateUrl: './water-proof-form.component.html',
  styleUrls: ['./water-proof-form.component.scss']
})
export class WaterProofFormComponent implements OnInit {

  title: string;

  formGroup = this.fb.group(
    {
      id : [''],
      name: ['', [checkSpace, Validators.maxLength(50)]],
      status: 1
    }
  )

  constructor(
    private fb: FormBuilder,
    private readonly waterProofService: WaterProofService,
    private matDialogRef: MatDialogRef<WaterProofFormComponent>,
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
      this.title = 'Thêm độ chống nước';
    } else {
      this.title = 'Sửa độ chống nước';
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
      this.waterProofService.create(this.formGroup.getRawValue());
    } else {
      this.waterProofService.update(this.dataDiaLog.row.id, this.formGroup.getRawValue());
    }
    this.waterProofService.isCloseDialog.subscribe(data => {
      if (data) {
        this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        this.waterProofService.isCloseDialog.next(false);
      }
    })
  }
}
