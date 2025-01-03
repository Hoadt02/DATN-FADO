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
import {ChangePasswordModule} from "../../pages/change-password/change-password.module";
import {IntroduceModule} from "../../pages/introduce/introduce.module";
import {InfoCustomerModule} from "../../pages/info-customer/info-customer.module";

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
    FooterModule,
    ChangePasswordModule,
    IntroduceModule,
    InfoCustomerModule
  ]
})
export class LayoutAdminModule { }
