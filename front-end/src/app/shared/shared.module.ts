import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {MatButtonModule} from "@angular/material/button";


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
