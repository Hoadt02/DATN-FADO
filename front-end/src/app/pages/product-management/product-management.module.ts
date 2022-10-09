import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
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
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatStepperModule} from "@angular/material/stepper";
import {ProductFormComponent} from "./product-form/product-form.component";
import { ProductViewComponent } from './product-view/product-view.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    ProductViewComponent,
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
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
    NgxDropzoneModule,
    MatStepperModule,
    MatTabsModule,
    MatMenuModule
  ],
  entryComponents: [ProductFormComponent, ProductViewComponent]
})
export class ProductManagementModule { }
