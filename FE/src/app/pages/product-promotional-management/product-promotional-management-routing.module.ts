import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductPromotionalListComponent} from "./product-promotional-list/product-promotional-list.component";

const routes: Routes = [
  {
    path:'',
    component: ProductPromotionalListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPromotionalManagementRoutingModule { }
