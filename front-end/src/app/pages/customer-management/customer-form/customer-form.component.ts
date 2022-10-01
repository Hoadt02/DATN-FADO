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

  }
}
