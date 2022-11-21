import { Component, OnInit } from '@angular/core';
import {checkSpace} from "../../shared/validator/validate";
import {FormBuilder, Validators} from "@angular/forms";
import {Regex} from "../../shared/validator/regex";
import {CustomerService} from "../../shared/service/api-service-impl/customer.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup = this.fb.group({
    id: [''],
    firstname: ['', [checkSpace, Validators.pattern(Regex.name)]],
    lastname: ['', [checkSpace,  Validators.pattern(Regex.name)]],
    dateOfBirth: ['', Validators.required],
    image: ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png'],
    username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24), Validators.pattern(Regex.username)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(24),
        Validators.pattern(Regex.password),
      ],
    ],
    email: ['', [checkSpace, Validators.pattern(Regex.email)]],
    phoneNumber: ['', [checkSpace, Validators.pattern(Regex.phoneNumber)]],
    gender: ['',Validators.required],
    status: [1],
    role: []
  })

  isLoading = false;

  constructor(private fb: FormBuilder,
              private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  signUp(){
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;

    this.isLoading = true;
    this.customerService.create(this.formGroup.getRawValue());
    this.customerService.isDoneRegister.subscribe(data => {
      if (data){
        this.isLoading = false;
      }
    })
  }

}
