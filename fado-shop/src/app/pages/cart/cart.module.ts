import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import {FormsModule} from "@angular/forms";
import {NumberOnlyDirective} from "../../shared/directive/number-only.directive";


@NgModule({
  declarations: [
    CartComponent,
    NumberOnlyDirective,
  ],
  exports: [
    NumberOnlyDirective
  ],
    imports: [
        CommonModule,
        CartRoutingModule,
        FormsModule
    ]
})
export class CartModule { }
