import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderHistoryRoutingModule } from './order-history-routing.module';
import { OrderHistoryListComponent } from './order-history-list/order-history-list.component';
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
  declarations: [
    OrderHistoryListComponent
  ],
  imports: [
    CommonModule,
    OrderHistoryRoutingModule,
    MatTabsModule
  ]
})
export class OrderHistoryModule { }
