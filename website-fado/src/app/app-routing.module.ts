import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {content} from "./shared/routes/routes";

const routes: Routes = [
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
