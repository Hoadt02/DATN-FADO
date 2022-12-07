import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WaterProofListComponent} from './water-proof-list/water-proof-list.component';

const routes: Routes = [
  {
    path: '',
    component: WaterProofListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterProofManagementRoutingModule { }
