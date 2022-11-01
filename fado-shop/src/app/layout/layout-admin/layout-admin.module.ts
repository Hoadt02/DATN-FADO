import { NgModule } from '@angular/core';

import { LayoutAdminRoutingModule } from './layout-admin-routing.module';
import {HomePageModule} from "../../pages/home-page/home-page.module";
import {ProductModule} from "../../pages/product/product.module";
import {ContactModule} from "../../pages/contact/contact.module";
import {LayoutAdminComponent} from "./layout-admin.component";
import {ProductDetailModule} from "../../pages/product-detail/product-detail.module";
import {CartModule} from "../../pages/cart/cart.module";
import {HeaderModule} from "../../component/header/header.module";
import {FooterModule} from "../../component/footer/footer.module";

@NgModule({
  declarations: [
    LayoutAdminComponent,
  ],
  imports: [
    LayoutAdminRoutingModule,
    HomePageModule,
    ProductModule,
    ProductDetailModule,
    ContactModule,
    CartModule,
    HeaderModule,
    FooterModule
  ]
})
export class LayoutAdminModule { }
