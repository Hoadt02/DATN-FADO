import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ProductComponent} from "./product.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAccordion, MatExpansionModule} from "@angular/material/expansion";


@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
  ]
})
export class ProductModule {
}
