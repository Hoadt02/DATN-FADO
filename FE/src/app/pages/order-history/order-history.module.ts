import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderHistoryRoutingModule } from './order-history-routing.module';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderHistoryDetailComponent } from './order-history-detail/order-history-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {MatStepperModule} from "@angular/material/stepper";
import {MatMenuModule} from "@angular/material/menu";
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {BarcodeScannerLivestreamModule} from "ngx-barcode-scanner";
import {NgxCurrencyModule} from "ngx-currency";
import {MatDividerModule} from "@angular/material/divider";

@NgModule({
  declarations: [
    OrderHistoryComponent ,
    OrderHistoryDetailComponent
  ],
  imports: [
    CommonModule,
    OrderHistoryRoutingModule,
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
    MatIconModule,
    MatGridListModule,
    FormsModule,
    MatNativeDateModule,
    BarcodeScannerLivestreamModule,
    NgxCurrencyModule,
    MatDividerModule
  ]
})
export class OrderHistoryModule { }
