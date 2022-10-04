import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CustomerService} from '../../../shared/services/api-service-impl/customer.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constants} from '../../../shared/Constants';
import {Regex} from '../../../shared/regexs/regex';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  title: string;

  formGroup = this.fb.group({
    id: [''],
    firstname: ['', [Validators.required,
      Validators.pattern(Regex.name)]],
    lastname: ['', [Validators.required,
      Validators.pattern(Regex.name)]],
    dateOfBirth: [new Date(), Validators.required],
    image: [''],
    username: ['', [Validators.required, Validators.pattern(Regex.username)]],
    password: ['', Validators.required],
    email: ['', [Validators.required,
      Validators.pattern(Regex.email)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(Regex.phoneNumber)]],
    gender: [1],
    address: ['', Validators.required],
    status: [1],
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
      this.title = 'Thêm mới khach hang';
    } else {
      this.title = 'Chỉnh sửa khach hang';
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
    // tslint:disable-next-line:triple-equals
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.customerService.create(this.formGroup.getRawValue());
    } else {
      this.customerService.update(this.dataDiaLog.row.id, this.formGroup.getRawValue());
    }
    this.customerService.isCloseDialog.subscribe(data => {
      if (data) {
        this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
        this.customerService.isCloseDialog.next(false);
      }
    })
  }

}
