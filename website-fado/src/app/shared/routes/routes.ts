import {Routes} from '@angular/router';
import {HomePageComponent} from "../../pages/home-page/home-page.component";
import {ProductComponent} from "../../pages/product/product.component";

export const content: Routes = [
  {
    path: 'product',
    loadChildren: () => import('../../pages/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'home-page',
    component: HomePageComponent
  }
];
