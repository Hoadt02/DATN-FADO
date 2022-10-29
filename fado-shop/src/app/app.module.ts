import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {LayoutAdminModule} from "./layout/layout-admin/layout-admin.module";
import {httpInterceptorProviders} from "./shared/helpers/http.interceptor";

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
    providers: [httpInterceptorProviders],
    bootstrap: [AppComponent]
})
export class AppModule { }
