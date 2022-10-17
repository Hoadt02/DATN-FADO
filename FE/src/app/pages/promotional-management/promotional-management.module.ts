import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionalManagementRoutingModule } from './promotional-management-routing.module';
import { PromotionalListComponent } from './promotional-list/promotional-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import { PromotionalFormComponent } from './promotional-form/promotional-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from "@angular/material/card";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    PromotionalListComponent,
    PromotionalFormComponent,
  ],
    imports: [
        CommonModule,
        PromotionalManagementRoutingModule,
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
    ]
})
export class PromotionalManagementModule { }
