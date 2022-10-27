import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {LayoutAdminModule} from './layout/layout-admin/layout-admin.module';
import {ToastrModule} from "ngx-toastr";
import {MatMenuModule} from "@angular/material/menu";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutAdminModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-left', timeOut: 1000,
      // preventDuplicates: true,
      closeButton: true,
      progressBar: true,
      // maxOpened: 1,
      autoDismiss: true,
    }),
    BrowserAnimationsModule,
    MatDialogModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
