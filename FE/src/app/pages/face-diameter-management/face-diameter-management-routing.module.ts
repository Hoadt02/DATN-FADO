import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FaceDiameterListComponent} from './face-diameter-list/face-diameter-list.component';

const routes: Routes = [
  {
    path: '',
    component: FaceDiameterListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaceDiameterManagementRoutingModule { }
