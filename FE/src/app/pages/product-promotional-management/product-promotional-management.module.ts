import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductPromotionalManagementRoutingModule} from './product-promotional-management-routing.module';
import {ProductPromotionalListComponent} from './product-promotional-list/product-promotional-list.component';
import {ProductPromotionalFormComponent} from "./product-promotional-form/product-promotional-form.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProductPromotionalListComponent,
    ProductPromotionalFormComponent
  ],
    imports: [
        CommonModule,
        ProductPromotionalManagementRoutingModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTableModule,
        MatCheckboxModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatDialogModule,
        MatSortModule,
        FormsModule
    ]
})
export class ProductPromotionalManagementModule {
}
