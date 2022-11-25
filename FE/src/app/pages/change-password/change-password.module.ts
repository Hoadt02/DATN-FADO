import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChangePasswordComponent} from "./change-password.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [ ChangePasswordComponent,],
  entryComponents: [ChangePasswordComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class ChangePasswordModule { }
