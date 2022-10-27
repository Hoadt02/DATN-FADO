import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SellAtStoreComponent} from "./sell-at-store/sell-at-store.component";

const routes: Routes = [{
  path: '',
  component: SellAtStoreComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellAtStoreRoutingModule {
}
