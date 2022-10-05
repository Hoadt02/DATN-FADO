import {Component, Inject, OnInit} from '@angular/core';
import {StaffService} from '../../../shared/services/api-service-impl/staff.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {Constants} from '../../../shared/Constants';
import {Regex} from '../../../shared/regexs/regex';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit {

  isLoading = false;
  title: String;

  formGroup = this.fb.group({
    id: [''],
    firstname: ['', [Validators.required,
      Validators.pattern(Regex.name)]],
    lastname: ['', [Validators.required,
      Validators.pattern(Regex.name)]],
    dateOfBirth: [new Date(), Validators.required],
    image: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png'],
    username: ['', [Validators.required, Validators.pattern(Regex.username)]],
    password: ['', Validators.required],
    email: ['', [Validators.required,
      Validators.pattern(Regex.email)]],
    phoneNumber: ['', [Validators.required,
      Validators.pattern(Regex.phoneNumber)]],
    gender: [1],
    address: ['', Validators.required],
    status: [1],
    role: this.fb.group({
      id: [4],
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
      this.staffService.create(this.formGroup.getRawValue());
    } else {
      this.staffService.update(this.dataDiaLog.row.id, this.formGroup.getRawValue());
    }
    this.staffService.isCloseDialog.subscribe(data => {
      if (data) {
        this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        this.staffService.isCloseDialog.next(false);
      }
    })
  }

  close() {
    this.matDialogRef.close();
  }
}
