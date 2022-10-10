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


@NgModule({
  declarations: [
    PromotionalListComponent,
    PromotionalFormComponent
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
    MatDialogModule

  ]
})
export class PromotionalManagementModule { }
