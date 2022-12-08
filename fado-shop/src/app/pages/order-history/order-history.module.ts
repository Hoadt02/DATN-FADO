import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderHistoryRoutingModule } from './order-history-routing.module';
import { OrderHistoryListComponent } from './order-history-list/order-history-list.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {RevertDetailComponent} from "./revert-detail/revert-detail.component";
import { EditAddressOrderComponent } from './edit-address-order/edit-address-order.component';
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    OrderHistoryListComponent,
    RevertDetailComponent,
    EditAddressOrderComponent
  ],
  imports: [
    CommonModule,
    OrderHistoryRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class OrderHistoryModule { }
