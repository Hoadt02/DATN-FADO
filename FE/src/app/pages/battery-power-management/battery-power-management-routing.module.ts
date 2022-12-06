import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BatteryPowerListComponent} from './battery-power-list/battery-power-list.component';

const routes: Routes = [
  {
    path: '',
    component: BatteryPowerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatteryPowerManagementRoutingModule { }
