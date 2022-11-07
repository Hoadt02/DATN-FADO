import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './components/sidebar/sidebar.module';
import { FooterModule } from './components/footer/footer.module';
import { NavbarModule} from './components/navbar/navbar.module';
import { FixedPluginModule} from './components/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {HttpClientModule} from "@angular/common/http";
import {httpInterceptorProviders} from "./shared/helpers/http.interceptor";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-left', timeOut: 1500,
      closeButton: true,
      maxOpened: 1,
      autoDismiss: true,
    }),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
