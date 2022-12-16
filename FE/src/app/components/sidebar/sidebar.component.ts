import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../shared/services/jwt/storage.service";
import {Constants} from "../../shared/Constants";


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'nc-bank',
    class: ''
  },
  {
    path: '/sell-at-store',
    title: 'Bán hàng tại quầy',
    icon: 'nc-basket',
    class: ''
  },
  {
    path: '/order-management',
    title: 'Quản lý đơn hàng',
    icon: 'nc-cart-simple',
    class: ''
  },
  {
    path: '/order-history',
    title: 'Lịch sử hóa đơn',
    icon: 'nc-cart-simple',
    class: ''
  },
  {
    path: '/product-management',
    title: 'Quản lý sản phẩm',
    icon: 'nc-watch-time',
    class: ''
  },
  {
    path: '/staff-management',
    title: 'Quản lý nhân viên',
    icon: 'nc-single-02',
    class: ''
  },
  {
    path: '/customer-management',
    title: 'Quản lý khách hàng',
    icon: 'nc-single-02',
    class: ''
  },
  {
    path: "/promotional-management",
    title: "Quản lý khuyến mại",
    icon: "nc-box-2",
    class: ""
  },
  {
    path: "/voucher-management",
    title: "Quản lý voucher",
    icon: "nc-money-coins",
    class: ""
  },
  {
    path: '/category-management',
    title: 'Quản lý danh mục',
    icon: 'nc-bullet-list-67',
    class: ''
  },
  {
    path: '/product-line',
    title: 'Các dòng sản phẩm',
    icon: 'nc-watch-time',
    class: ''
  },
  {
    path: '/brand-management',
    title: 'Quản lý thương hiệu',
    icon: 'nc-bold',
    class: ''
  },
  {
    path: '/material-management',
    title: 'Quản lý chất liệu',
    icon: 'nc-atom',
    class: ''
  },
  {
    path: '/origin-management',
    title: 'Quản lý xuất xứ',
    icon: 'nc-shop',
    class: ''
  },
  {
    path: '/face-diameter-management',
    title: 'Quản lý đường kính',
    icon: 'nc-ruler-pencil',
    class: ''
  },
  {
    path: '/water-proof-management',
    title: 'Quản lý độ chống nước',
    icon: 'nc-support-17',
    class: ''
  },
  {
    path: '/battery-power-management',
    title: 'Quản lý năng lượng pin',
    icon: 'nc-atom',
    class: ''
  },
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];

  role:boolean;

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
    if (this.storageService.getAuthority() === Constants.TYPE_AUTH.SUPER_ADMIN){
      this.role = true
    }else {
      this.role = false;
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
