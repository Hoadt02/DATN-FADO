import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';
import {TableComponent} from '../../pages/table/table.component';
import {TypographyComponent} from '../../pages/typography/typography.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {NotificationsComponent} from '../../pages/notifications/notifications.component';
import {Constants} from "../../shared/Constants";
import {HasRoleGuard} from "../../shared/guard/has-role.guard";
import {AuthGuard} from "../../shared/guard/auth.guard";

const TYPE_AUTH = Constants.TYPE_AUTH;

export const AdminLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.ADMIN
    }
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.ADMIN
    }
  },
  {
    path: 'table',
    component: TableComponent,
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.ADMIN
    }
  },
  {
    path: 'typography',
    component: TypographyComponent,
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.ADMIN
    }
  },
  {
    path: 'icons',
    component: IconsComponent,
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.ADMIN
    }
  },
  {
    path: 'maps',
    component: MapsComponent,
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.ADMIN
    }
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.ADMIN
    }
  },
  {
    path: 'product-management',
    loadChildren: () => import('../../pages/product-management/product-management.module').then(m => m.ProductManagementModule),
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.SUPER_ADMIN
    }
  },
  {
    path: 'staff-management',
    loadChildren: () => import('../../pages/staff-management/staff-management.module').then(m => m.StaffManagementModule),
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.SUPER_ADMIN
    }
  },
  {
    path: 'promotional-management',
    loadChildren: () => import('../../pages/promotional-management/promotional-management.module').then(m => m.PromotionalManagementModule),
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.SUPER_ADMIN
    }
  },
  {
    path: 'product-promotional-management',
    loadChildren: () => import('../../pages/product-promotional-management/product-promotional-management.module').then(m => m.ProductPromotionalManagementModule),
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.SUPER_ADMIN
    }
  },
  {
    path: 'customer-management',
    loadChildren: () => import('../../pages/customer-management/customer-management.module').then(m => m.CustomerManagementModule),
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.ADMIN
    }
  },
  {
    path: 'material-management',
    loadChildren: () => import('../../pages/material-management/material-management.module').then(m => m.MaterialManagementModule),
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.SUPER_ADMIN
    }
  },
  {
    path: 'origin-management',
    loadChildren: () => import('../../pages/origin-management/origin-management.module').then(m => m.OriginManagementModule),
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.SUPER_ADMIN
    }
  },
  {
    path: 'category-management',
    loadChildren: () => import('../../pages/category-management/category-management.module').then(m => m.CategoryManagementModule),
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.SUPER_ADMIN
    }
  },
  {
    path: 'brand-management',
    loadChildren: () => import('../../pages/brand-management/brand-management.module').then(m => m.BrandManagementModule),
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.SUPER_ADMIN
    }
  },
  {
    path: 'product-line',
    loadChildren: () => import('../../pages/product-line/product-line.module').then(m => m.ProductLineModule),
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.SUPER_ADMIN
    }
  },
  {
    path: 'voucher-management',
    loadChildren: () => import('../../pages/voucher-management/voucher-management.module').then(m => m.VoucherManagementModule),
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.SUPER_ADMIN
    }
  },
  {
    path: 'order-management',
    loadChildren: () => import('../../pages/order-management/order-management.module').then(m => m.OrderManagementModule),
    canActivate: [HasRoleGuard],
    data: {
      role: TYPE_AUTH.ADMIN
    }
  },
];
