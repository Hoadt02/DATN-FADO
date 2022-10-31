import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guard/auth.guard';
import { HasRoleGuard } from '../../shared/guard/has-role.guard';

const ROLE = 'ROLE_CUSTOMER';

const routes: Routes = [
  {
    path: 'home-page',
    loadChildren: () =>
      import('../../pages/home-page/home-page.module').then(
        (m) => m.HomePageModule
      ),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('../../pages/contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('../../pages/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('../../pages/cart/cart.module').then((m) => m.CartModule),
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      role: ROLE,
    },
  },
  {
    path: 'product-detail/:id',
    loadChildren: () =>
      import('../../pages/product-detail/product-detail.module').then(
        (m) => m.ProductDetailModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../../auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'check-out',
    loadChildren: () =>
      import('../../pages/check-out/check-out.module').then(
        (m) => m.CheckOutModule
      ),
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      role: ROLE,
    },
  },
  {
    path: 'order-history',
    loadChildren: () =>
      import('../../pages/order-history/order-history.module').then(
        (m) => m.OrderHistoryModule
      ),
    canActivate: [AuthGuard, HasRoleGuard],
    data: {
      role: ROLE,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutAdminRoutingModule {}
