import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('././pages/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('././pages/contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'product',
    loadChildren: () => import('././pages/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('././pages/product-detail/product-detail.module').then(m => m.ProductDetailModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
