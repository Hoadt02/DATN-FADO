import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StaffManagementRoutingModule} from './staff-management-routing.module';
import {StaffListComponent} from './staff-list/staff-list.component';
import {StaffFormComponent} from './staff-form/staff-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from "@angular/material/dialog";
import {MatRadioModule} from "@angular/material/radio";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    StaffListComponent,
    StaffFormComponent
  ],
    imports: [
        CommonModule,
        StaffManagementRoutingModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        FormsModule,
        MatSlideToggleModule,
        MatIconModule,
    ]
})
export class StaffManagementModule {
}
