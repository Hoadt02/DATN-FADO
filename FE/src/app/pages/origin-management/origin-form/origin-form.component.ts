import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../shared/Constants";
import {OriginService} from "../../../shared/services/api-service-impl/origin.service";
import {checkSpace} from '../../../shared/validator/validatorForm';
import {Regex} from '../../../shared/validator/regex';

@Component({
  selector: 'app-battery-power-form',
  templateUrl: './origin-form.component.html',
  styleUrls: ['./origin-form.component.scss']
})
export class OriginFormComponent implements OnInit {

  title : string;

  formGroup = this.fb.group(
    {
      id : [''],
      name: ['', [checkSpace, Validators.pattern(Regex.name) , Validators.maxLength(50)]],
      status: true
    }
  )

  constructor(
    private fb : FormBuilder,
    private readonly originService : OriginService,
    private matDialogRef : MatDialogRef<OriginFormComponent>,
    @Inject(MAT_DIALOG_DATA) private dataDiaLog?: any,
  ) { }

  ngOnInit(): void {
    if (this.dataDiaLog.row){
      console.log(this.dataDiaLog.row)
      this.formGroup.patchValue(this.dataDiaLog.row);
    }
    this.setTitle();
  }

  onDismiss() {
      this.matDialogRef.close();
  }

  setTitle(){
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW){
      this.title = 'Thêm xuất xứ';
    }else{
      this.title = 'Sửa xuất xứ';
    }
  }

  onSubmit() {
    console.log(this.formGroup.getRawValue());
    this.formGroup.markAllAsTouched();
    if(this.formGroup.invalid){
      console.log('có lỗi');
      return;
    }
    if(this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW){
      this.originService.create(this.formGroup.getRawValue());
    }else{
      this.originService.update(this.dataDiaLog.row.id,this.formGroup.getRawValue());
    }
    this.originService.isCloseDialog.subscribe(data => {
      if (data) {
        this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        this.originService.isCloseDialog.next(false);
      }
    })
  }
}
