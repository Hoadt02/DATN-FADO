import {Routes} from "@angular/router";
import {DashboardComponent} from "../../pages/dashboard/dashboard.component";
import {IconsComponent} from "../../pages/icons/icons.component";
import {MapComponent} from "../../pages/map/map.component";
import {NotificationsComponent} from "../../pages/notifications/notifications.component";
import {UserComponent} from "../../pages/user/user.component";
import {TablesComponent} from "../../pages/tables/tables.component";
import {TypographyComponent} from "../../pages/typography/typography.component";

export const content: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  {
    path: "categories",
    loadChildren: () => import('../../pages/categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: "product-management",
    loadChildren: () => import('../../pages/product-management/product-management.module').then(m => m.ProductManagementModule)
  }
]
