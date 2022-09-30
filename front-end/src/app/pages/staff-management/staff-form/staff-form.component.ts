import {Component, Inject, OnInit} from '@angular/core';
import {StaffService} from '../../../shared/services/api-service-impl/staff.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {Constants} from '../../../shared/Constants';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit {

  title: String;

  formGroup = this.fb.group({
    id: [''],
    firstname: [''],
    lastname: [''],
    dateOfBirth: [''],
    image: [''],
    username: [''],
    password: [''],
    email: [''],
    phoneNumber: [''],
    gender: [1],
    address: [''],
    status: [''],
    role: this.fb.group({
      id: [''],
    })
  })

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private matDialogRef: MatDialogRef<StaffFormComponent>,
    @Inject(MAT_DIALOG_DATA) private dataDiaLog?: any,
  ) {
  }

  ngOnInit(): void {
    this.setTitleForm();
  }

  setTitleForm() {
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.title = 'Thêm mới nhân viên';
    } else {
      this.title = 'Chỉnh sửa nhân viên';
    }
  }

  save() {
    console.log(this.formGroup.getRawValue());
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      console.log('abcxyz');
      return;
    }
  }

  close() {
    this.matDialogRef.close();
  }
}
