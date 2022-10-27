import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckOutRoutingModule } from './check-out-routing.module';
import { CheckOutComponent } from './check-out.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CheckOutComponent
  ],
  imports: [
    CommonModule,
    CheckOutRoutingModule,
    MatRadioModule,
    FormsModule,
  ]
})
export class CheckOutModule { }
