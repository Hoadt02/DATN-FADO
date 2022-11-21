import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {StaffService} from "../../shared/services/api-service-impl/staff.service";
import {ToastrService} from "ngx-toastr";
import {Regex} from "../../shared/validator/regex";
import {SendMailService} from "../../shared/services/api-service-impl/send-mail.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  formGroup = this.fb.group({
    password: ['',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24),
        Validators.pattern(Regex.password)
      ]
    ],
    confirm_password: ['',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24),
        Validators.pattern(Regex.password)
      ]
    ]
  });

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  ticks = 60;

  showConfirmEmail = true;
  showConfirmCode = false;
  showChangePass = false;
  showMessageSendTo = false;

  hide1 = true;
  hide2 = true;

  code:any;
  staffChangePass:any;

  isLoading = false;

  constructor(private fb: FormBuilder,
              private staffService: StaffService,
              private toastrService: ToastrService,
              private sendMailService: SendMailService,) { }

  ngOnInit(): void {
  }

  onCodeChanged(code: string) {
    this.code = null;
  }

  onCodeCompleted(code: string) {
    this.code = code;
  }

  timerInterval(){
    const timerInterval = setInterval(()=>{
      this.ticks--;
      if (this.ticks == 0){
        clearInterval(timerInterval);
        this.showMessageSendTo = true;
      }
    }, 1000);
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;
    if (this.formGroup.getRawValue().password != this.formGroup.getRawValue().confirm_password) return;

    this.isLoading = true;
    this.staffChangePass.password = this.formGroup.getRawValue().password;
    this.staffService.updatePass(this.staffChangePass.id, this.staffChangePass);
  }

  findCustomerByEmailAndSendOTP() {
    this.emailFormControl.markAllAsTouched();
    if (this.emailFormControl.invalid) return;

    this.isLoading = true;
    this.staffService.findStaffByEmailAndSendOTP(this.emailFormControl.value).subscribe({
      next:(data)=>{
        this.staffChangePass = data;
        this.showConfirmEmail = false;
        this.showConfirmCode = true;
        this.timerInterval();
        this.isLoading = false;
      },error:(error) => {
        this.isLoading = false;
        this.toastrService.error(error.error.message);
      }
    })
  }

  verificationCode(){
    if (this.code == null){
      this.toastrService.warning('Vui lòng nhập đầy đủ 6 chữ số để xác minh tài khoản!');
      return;
    };

    this.isLoading = true;
    this.sendMailService.verificationOTP(this.code).subscribe({
      next:(data)=>{
        if (data == true){
          this.showConfirmCode = false;
          this.showChangePass = true;
        }else {
          this.toastrService.error('Mã xác thực không chính xác hoặc đã hết hạn!')
        }
        this.isLoading = false;
      },error:(error) => {
        this.isLoading = false;
        console.log(error)
        this.toastrService.error('Lỗi xác thực!');
      }
    });
  }

  sendMailAgain(){
    this.sendMailService.sendMailAgain(this.staffChangePass.email);
    this.ticks = 60;
    this.showMessageSendTo = false;
    this.timerInterval();
  }
}
