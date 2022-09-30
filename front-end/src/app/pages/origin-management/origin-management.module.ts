import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OriginManagementRoutingModule } from './origin-management-routing.module';
import { OriginListComponent } from './origin-list/origin-list.component';
import { OriginFormComponent } from './origin-form/origin-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
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
    OriginListComponent,
    OriginFormComponent,
  ],
  imports: [
    CommonModule,
    OriginManagementRoutingModule,
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
  ],
  entryComponents:[OriginFormComponent]
})
export class OriginManagementModule { }
