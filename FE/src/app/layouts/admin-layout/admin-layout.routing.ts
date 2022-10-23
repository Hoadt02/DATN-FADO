import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';
import {TableComponent} from '../../pages/table/table.component';
import {TypographyComponent} from '../../pages/typography/typography.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {NotificationsComponent} from '../../pages/notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user', component: UserComponent},
  {path: 'table', component: TableComponent},
  {path: 'typography', component: TypographyComponent},
  {path: 'icons', component: IconsComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'notifications', component: NotificationsComponent},
  // {
  //   path: 'product-management',
  //   loadChildren: () => import('../../pages/product-management/product-management.module').then(m => m.ProductManagementModule)
  // },
  {
    path: 'staff-management',
    loadChildren: () => import('../../pages/staff-management/staff-management.module').then(m => m.StaffManagementModule)
  },
  {
    path: 'promotional-management',
    loadChildren: () => import('../../pages/promotional-management/promotional-management.module').then(m => m.PromotionalManagementModule)
  },
  {
    path: 'product-promotional-management',
    loadChildren: () => import('../../pages/product-promotional-management/product-promotional-management.module').then(m => m.ProductPromotionalManagementModule)
  },
  {
    path: 'customer-management',
    loadChildren: () => import('../../pages/customer-management/customer-management.module').then(m => m.CustomerManagementModule)
  },
  {
    path: 'material-management',
    loadChildren: () => import('../../pages/material-management/material-management.module').then(m => m.MaterialManagementModule)
  },
  {
    path: 'origin-management',
    loadChildren: () => import('../../pages/origin-management/origin-management.module').then(m => m.OriginManagementModule)
  },
  {
    path: 'category-management',
    loadChildren: () => import('../../pages/category-management/category-management.module').then(m => m.CategoryManagementModule)
  },
  {
    path: 'brand-management',
    loadChildren: () => import('../../pages/brand-management/brand-management.module').then(m => m.BrandManagementModule)
  },
  {
    path: 'product-line',
    loadChildren: () => import('../../pages/product-line/product-line.module').then(m => m.ProductLineModule)
  },
  {
    path: 'voucher-management',
    loadChildren: () => import('../../pages/voucher-management/voucher-management.module').then(m => m.VoucherManagementModule)
  },
];
