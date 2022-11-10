import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChangeInfoLoginComponent} from './change-info-login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    ChangeInfoLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatIconModule,
  ]
})
export class ChangeInfoLoginModule {
}
