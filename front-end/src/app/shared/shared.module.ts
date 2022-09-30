import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";


@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  entryComponents: [ConfirmDialogComponent],
  imports: [
    CommonModule,
  ]
})
export class SharedModule {
}
