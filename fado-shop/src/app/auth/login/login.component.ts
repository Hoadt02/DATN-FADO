import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/service/jwt/auth.service";
import {StorageService} from "../../shared/service/jwt/storage.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import {checkSpace} from "../../shared/validator/validate";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup = this.fb.group({
    username: ['', [checkSpace]],
    password: ['', [checkSpace]]
  })

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      void this.router.navigate(['']);
    }
  }

  login(){
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;
    this.authService.login(this.formGroup.getRawValue().username as string,this.formGroup.getRawValue().password as string);
  }

}
