import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialManagementRoutingModule } from './material-management-routing.module';
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
import {MaterialListComponent} from "./material-list/material-list.component";
import {MaterialFormComponent} from "./material-form/material-form.component";


@NgModule({
  declarations: [
    MaterialListComponent,
    MaterialFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialManagementRoutingModule,
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
  entryComponents:[MaterialFormComponent]
})
export class MaterialManagementModule { }
