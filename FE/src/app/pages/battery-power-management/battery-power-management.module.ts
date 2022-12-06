import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatteryPowerManagementRoutingModule } from './battery-power-management-routing.module';
import { BatteryPowerListComponent } from './battery-power-list/battery-power-list.component';
import { BatteryPowerFormComponent } from './battery-power-form/battery-power-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    BatteryPowerListComponent,
    BatteryPowerFormComponent,
  ],
  imports: [
    CommonModule,
    BatteryPowerManagementRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  entryComponents: [BatteryPowerFormComponent]
})
export class BatteryPowerManagementModule { }
