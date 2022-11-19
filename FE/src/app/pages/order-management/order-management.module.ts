import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRoutingModule } from './order-management-routing.module';
import { OrderManagementComponent } from './order-management/order-management.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    OrderManagementComponent
  ],
  imports: [
    CommonModule,
    OrderManagementRoutingModule,
    MatTabsModule,
    MatExpansionModule,
    MatPaginatorModule
  ]
})
export class OrderManagementModule { }
