import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutAdminComponent} from "./layout/layout-admin/layout-admin.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home-page',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutAdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layout/layout-admin/layout-admin.module').then(m => m.LayoutAdminModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration:"enabled"})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
