import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CustomerService} from '../../../shared/services/api-service-impl/customer.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constants} from '../../../shared/Constants';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  title: string;

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
    gender: [''],
    address: [''],
    status: [''],
    role: this.fb.group({id: [4]}),
  })


  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private matDialogRef: MatDialogRef<CustomerFormComponent>,
              @Inject(MAT_DIALOG_DATA) private dataDiaLog?: any) { }

  ngOnInit(): void {
    this.setTitleForm();
  }

  setTitleForm() {
    // tslint:disable-next-line:triple-equals
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.title = 'Thêm mới danh mục';
    } else {
      this.title = 'Chỉnh sửa danh mục';

    }
  }
  onDismiss() {
    this.matDialogRef.close();
  }

  onSubmit() {
    console.log(this.formGroup.getRawValue());
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    if (this.dataDiaLog.type === Constants.TYPE_DIALOG.NEW) {
      this.customerService.create(this.formGroup.getRawValue());
    } else {
      this.customerService.update(this.dataDiaLog.row.id, this.formGroup.getRawValue());
    }
    // tslint:disable-next-line:no-shadowed-variable
    this.customerService.isCloseDialog.subscribe(data => {
      if (data) {
        this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        this.customerService.isCloseDialog.next(false);
      }
    })
  }
}
