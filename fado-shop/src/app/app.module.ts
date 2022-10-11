import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
<<<<<<< HEAD:website-fado/src/app/app.module.ts
    FooterComponent,
    HomePageComponent,
=======
    FooterComponent
>>>>>>> main:fado-shop/src/app/app.module.ts
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
