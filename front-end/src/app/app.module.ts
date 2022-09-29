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
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {NguiMapModule} from "@ngui/map";


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
