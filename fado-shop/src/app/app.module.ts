import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {LayoutAdminModule} from "./layout/layout-admin/layout-admin.module";

@NgModule({
    declarations: [
      AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        LayoutAdminModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
