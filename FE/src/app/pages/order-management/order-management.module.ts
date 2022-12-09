import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRoutingModule } from './order-management-routing.module';
import { OrderManagementComponent } from './order-management/order-management.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RevertOrderComponent } from './revert-order/revert-order.component';
import { RevertDetailComponent } from './revert-detail/revert-detail.component';
import {EditAddressOrderComponent} from "./edit-address-order/edit-address-order.component";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    OrderManagementComponent,
    RevertOrderComponent,
    RevertDetailComponent,
    EditAddressOrderComponent
  ],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    MatTabsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class OrderManagementModule { }
