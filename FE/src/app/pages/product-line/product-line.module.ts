import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductLineRoutingModule } from './product-line-routing.module';
import { ProductLineFormComponent } from './product-line-form/product-line-form.component';
import { ProductLineListComponent } from './product-line-list/product-line-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    ProductLineFormComponent,
    ProductLineListComponent
  ],
  imports: [
    CommonModule,
    ProductLineRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
  ]
})
export class ProductLineModule { }
