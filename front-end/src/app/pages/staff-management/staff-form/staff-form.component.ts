import {Component, Inject, OnInit} from '@angular/core';
import {StaffService} from '../../../shared/services/api-service-impl/staff.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {Constants} from '../../../shared/Constants';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit {

  isLoading: boolean = false;
  title: String;

  formGroup = this.fb.group({
    id: [''],
    firstname: ['', [Validators.required,
      Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)]],
    lastname: ['', [Validators.required,
      Validators.pattern(/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)]],
    dateOfBirth: [new Date(), Validators.required],
    image: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png'],
    username: ['', [Validators.required, Validators.pattern(/^[a-z0-9A-Z]+(([',.-][a-zA-Z ])?[a-zA-Z]*)*$/)]],
    password: ['', Validators.required],
    email: ['', [Validators.required,
      Validators.pattern(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]],
    phoneNumber: ['', [Validators.required,
      Validators.pattern(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/)]],
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
    this.isLoading = true;
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
        this.isLoading = false;
        this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        this.staffService.isCloseDialog.next(false);
      }
    })
  }

  close() {
    this.matDialogRef.close();
  }
}
