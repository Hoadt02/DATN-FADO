import { Component, OnInit } from '@angular/core';
import {Contants} from "../../shared/Contants";
import {MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "../../shared/service/api-service-impl/customer.service";
import {StorageService} from "../../shared/service/jwt/storage.service";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Regex} from "../../shared/validator/regex";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  hide1 = true;
  hide2 = true;
  hide3 = true;

  customer:any;

  currentPassControl = new FormControl('', [Validators.required, Validators.pattern(Regex.password)]);

  formGroup = this.fb.group({
    newPassControl: ['', [Validators.required,
                          Validators.minLength(8),
                          Validators.maxLength(24),
                          Validators.pattern(Regex.password)]],
    confirmPassControl: ['', [Validators.required,
                              Validators.minLength(8),
                              Validators.maxLength(24),
                              Validators.pattern(Regex.password)]]
  });

  show = true;
  isLoading!:boolean;

  constructor(private dialogRef: MatDialogRef<ChangePasswordComponent>,
              private customerService: CustomerService,
              private storageService: StorageService,
              private toastrService: ToastrService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onDismiss(): void {
    this.dialogRef.close(Contants.RESULT_CLOSE_DIALOG.CLOSE);
  }

  onSubmit(){
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;
    if (this.formGroup.getRawValue().newPassControl != this.formGroup.getRawValue().confirmPassControl) return;

    this.isLoading = true;
    this.customer.password = this.formGroup.getRawValue().newPassControl;
    this.customerService.updatePass(this.customer.id, this.customer);
    this.onDismiss();
  }

  onAccuracy() {
    this.isLoading = true;
    const data = {
      id: this.storageService.getIdFromToken(),
      password: this.currentPassControl.getRawValue()
    }
    this.customerService.accuracyPassword(data).subscribe({
      next:(res) =>{
        this.customer = res;
        this.show = false;
        this.toastrService.success('Mật khẩu trùng khớp!');
        this.isLoading = false;
      },error:(err) =>{
        this.isLoading = false;
        if (err.error.code == 'WRONG_PASS'){
          this.toastrService.error(err.error.message);
          return;
        }
        this.toastrService.error('Lỗi xác thực mật khẩu!');
    }
    });
  }
}
