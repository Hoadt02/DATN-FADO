import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CustomerService} from '../../../shared/services/api-service-impl/customer.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constants} from '../../../shared/Constants';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  title: string;
  isLoading: boolean = true;

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
    status: [1],
    role: this.fb.group({id: [4]}),
  })


  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private matDialogRef: MatDialogRef<CustomerFormComponent>,
              private toastrService: ToastrService,
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
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    // tslint:disable-next-line:triple-equals
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.customerService.create(this.formGroup.getRawValue()).subscribe({
        next: (data) => {
          console.log(data);
          this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
          this.toastrService.success('Thêm mới khach hang thành công')
        },
        // tslint:disable-next-line:no-shadowed-variable
        error: (error) => {
          console.log(error);
          this.toastrService.error('Thêm mới khach hang thất bại!');
        }
      });
    } else {
      this.customerService.update(this.dataDiaLog.row.id, this.formGroup.getRawValue()).subscribe({
        next: (data) => {
          console.log(data);
          this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
          this.toastrService.success('Cập nhật khach hang thành công')
        },
        // tslint:disable-next-line:no-shadowed-variable
        error: (error) => {
          console.log(error);
          this.toastrService.error('Cập nhật khach hang thất bại!');
        }
      });
    }
  }
}
