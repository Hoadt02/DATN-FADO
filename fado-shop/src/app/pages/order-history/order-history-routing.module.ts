import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderHistoryListComponent} from "./order-history-list/order-history-list.component";

const routes: Routes = [
  {
    path: '',
    component: OrderHistoryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderHistoryRoutingModule { }
