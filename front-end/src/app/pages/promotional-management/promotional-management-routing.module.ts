import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PromotionalListComponent} from "./promotional-list/promotional-list.component";

const routes: Routes = [
  {
    path: '',
    component: PromotionalListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromotionalManagementRoutingModule {
}
