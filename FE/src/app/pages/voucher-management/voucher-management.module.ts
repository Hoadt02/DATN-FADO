import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherManagementRoutingModule } from './voucher-management-routing.module';
import { VoucherListComponent } from './voucher-list/voucher-list.component';
import { VoucherFormComponent } from './voucher-form/voucher-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    VoucherListComponent,
    VoucherFormComponent,
  ],
  imports: [
    CommonModule,
    VoucherManagementRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  entryComponents: [VoucherFormComponent]
})
export class VoucherManagementModule { }
