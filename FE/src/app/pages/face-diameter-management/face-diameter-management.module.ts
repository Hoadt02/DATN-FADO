import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaceDiameterManagementRoutingModule } from './face-diameter-management-routing.module';
import { FaceDiameterListComponent } from './face-diameter-list/face-diameter-list.component';
import { FaceDiameterFormComponent } from './face-diameter-form/face-diameter-form.component';
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
    FaceDiameterListComponent,
    FaceDiameterFormComponent,
  ],
  imports: [
    CommonModule,
    FaceDiameterManagementRoutingModule,
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
  entryComponents: [FaceDiameterFormComponent]
})
export class FaceDiameterManagementModule { }
