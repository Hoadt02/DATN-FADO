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
import {ChangePasswordComponent} from "../../pages/change-password/change-password.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {ChangePasswordModule} from "../../pages/change-password/change-password.module";

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
  ]
})
export class LayoutAdminModule { }
