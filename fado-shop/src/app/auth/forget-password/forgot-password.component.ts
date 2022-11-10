import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Regex} from "../../shared/validator/regex";
import {CustomerService} from "../../shared/service/api-service-impl/customer.service";
import {ToastrService} from "ngx-toastr";
import {SendMailService} from "../../shared/service/api-service-impl/send-mail.service";

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
  customerChangePass:any;

  isLoading!:boolean;

  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
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
    this.customerChangePass.password = this.formGroup.getRawValue().password;
    this.customerService.updatePass(this.customerChangePass.id, this.customerChangePass);
  }

  findCustomerByEmailAndSendOTP() {
    this.emailFormControl.markAllAsTouched();
    if (this.emailFormControl.invalid) return;

    this.isLoading = true;
    this.customerService.findCustomerByEmailAndSendOTP(this.emailFormControl.getRawValue()).subscribe({
      next:(data)=>{
        this.customerChangePass = data;
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

    this.sendMailService.verificationOTP(this.code).subscribe({
      next:(data)=>{
        if (data == true){
          this.showConfirmCode = false;
          this.showChangePass = true;
        }else {
          this.toastrService.error('Mã xác thực không chính xác hoặc đã hết hạn!')
        }
      },error:(error) => {
        console.log(error)
        this.toastrService.error('Lỗi xác thực!');
      }
    });
  }

  sendMailAgain(){
    this.sendMailService.sendMailAgain(this.customerChangePass.email);
    this.ticks = 60;
    this.showMessageSendTo = false;
    this.timerInterval();
  }
}
