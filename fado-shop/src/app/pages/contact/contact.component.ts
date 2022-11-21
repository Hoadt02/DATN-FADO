import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {checkSpace} from "../../shared/validator/validate";
import {SendMailService} from "../../shared/service/api-service-impl/send-mail.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formGroup = this.fb.group({
    nameSender: ['', [checkSpace, Validators.min(2), Validators.maxLength(50)]],
    emailSender: ['', [checkSpace, Validators.email]],
    subject: ['', [checkSpace, Validators.minLength(10), Validators.maxLength(50)]],
    msgBody: ['', [checkSpace, Validators.minLength(10)]]
  });

  isLoading = false;

  constructor(private fb:FormBuilder,
              private sendmailService: SendMailService,
              private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;

    this.isLoading = true;
    this.sendmailService.sendMailContact(this.formGroup.getRawValue()).subscribe({
      next:(data) =>{
        if (data == true){
          this.toastrService.success('Gửi phản hồi thành công!');
        }else {
          this.toastrService.error('Gửi phản hồi thất bại!');
        }
        this.onReset();
      },error:(err)=>{
        console.log(err);
        this.onReset();
        this.toastrService.error('Gửi phản hồi thất bại!');
      }
    });
  }

  onReset(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/contact']));
  }
}
