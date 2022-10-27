import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CheckOutRoutingModule} from './check-out-routing.module';
import {CheckOutComponent} from './check-out.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {EditAddressComponent} from './edit-address/edit-address.component';
import {EditAddressFormComponent} from './edit-address-form/edit-address-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    CheckOutComponent,
    EditAddressComponent,
    EditAddressFormComponent
  ],
  imports: [
    CommonModule,
    CheckOutRoutingModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
  ]
})
export class CheckOutModule {
}
