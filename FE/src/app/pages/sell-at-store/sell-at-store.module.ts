import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellAtStoreRoutingModule } from './sell-at-store-routing.module';
import { SellAtStoreComponent } from './sell-at-store/sell-at-store.component';
  import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatStepperModule} from "@angular/material/stepper";
import {MatMenuModule} from "@angular/material/menu";
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    SellAtStoreComponent
  ],
  imports: [
    CommonModule,
    SellAtStoreRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatOptionModule,
    MatAutocompleteModule,
    AutocompleteLibModule,
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
    MatStepperModule,
    MatMenuModule,
    NgxDropzoneModule,
    MatIconModule
  ]
})
export class SellAtStoreModule { }
