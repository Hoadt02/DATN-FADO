import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterProofManagementRoutingModule } from './water-proof-management-routing.module';
import { WaterProofListComponent } from './water-proof-list/water-proof-list.component';
import { WaterProofFormComponent } from './water-proof-form/water-proof-form.component';
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
    WaterProofListComponent,
    WaterProofFormComponent,
  ],
  imports: [
    CommonModule,
    WaterProofManagementRoutingModule,
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
  entryComponents: [WaterProofFormComponent]
})
export class WaterProofManagementModule { }
