import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {CustomerFormComponent} from "../pages/customer-management/customer-form/customer-form.component";


@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  entryComponents: [ConfirmDialogComponent],
    imports: [
        CommonModule,
        MatButtonModule,
    ]
})
export class SharedModule {
}
