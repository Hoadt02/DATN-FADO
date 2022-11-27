import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CustomerService} from '../../../shared/services/api-service-impl/customer.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constants} from '../../../shared/Constants';
import {Regex} from '../../../shared/validator/regex';
import {checkSpace} from '../../../shared/validator/validatorForm';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  title: string;
  isLoading = false;
  hide = true;
  hidePassword = true;

  formGroup = this.fb.group({
    id: [''],
    firstname: ['', [checkSpace, Validators.pattern(Regex.name)]],
    lastname: ['', [checkSpace,  Validators.pattern(Regex.name)]],
    dateOfBirth: [new Date(), Validators.required],
    image: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png'],
    username: ['', [
      Validators.required,
      Validators.pattern(Regex.username),
      Validators.minLength(8),
      Validators.maxLength(24)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(60),
        // Validators.pattern(Regex.password),
      ],
    ],
    email: ['', [Validators.required, Validators.pattern(Regex.email)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(Regex.phoneNumber)]],
    gender: [1],
    address: ['', checkSpace],
    status: [1],
    role: this.fb.group({
      id: [4]
    }),
  })


  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private matDialogRef: MatDialogRef<CustomerFormComponent>,
              @Inject(MAT_DIALOG_DATA) private dataDiaLog?: any) {
  }

  ngOnInit(): void {
    this.setTitleForm();
  }

  setTitleForm() {
    // tslint:disable-next-line:triple-equals
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.title = 'Thêm mới khách hàng';
    } else {
      this.title = 'Chỉnh sửa khách hàng';
      this.hidePassword = false;
      if (this.dataDiaLog.row) {
        this.formGroup.patchValue(this.dataDiaLog.row)
      }
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
