import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MaterialListComponent} from "./material-list/material-list.component";

const routes: Routes = [
  {
    path: '',
    component: MaterialListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialManagementRoutingModule { }
