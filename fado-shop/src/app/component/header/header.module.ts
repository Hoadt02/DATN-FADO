import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import {HeaderComponent} from "./header.component";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [HeaderComponent],
  exports: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        HeaderRoutingModule,
        AutocompleteLibModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        FormsModule,
    ]
})
export class HeaderModule { }
