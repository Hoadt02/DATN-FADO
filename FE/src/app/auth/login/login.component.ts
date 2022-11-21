import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/jwt/auth.service";
import {StorageService} from "../../shared/services/jwt/storage.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpRequestInterceptor} from "../../shared/helpers/http.interceptor";
import {checkSpace} from "../../shared/validator/validatorForm";
import {Constants} from "../../shared/Constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  formGroup = this.fb.group({
    username: ['', [checkSpace]],
    password: ['', [checkSpace]]
  })

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      if (this.storageService.getAuthority() === Constants.TYPE_AUTH.SUPER_ADMIN){
        void this.router.navigate(['']);
      }else {
        void this.router.navigate(['/sell-at-store'])
      }
    }
  }

  login(){
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;
    this.authService.login(this.formGroup.getRawValue().username,this.formGroup.getRawValue().password);
  }
}
