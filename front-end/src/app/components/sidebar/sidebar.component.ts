import {Component, OnInit} from '@angular/core';


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
    path: "/product-management",
    title: "Quản lý sản phẩm",
    icon: "nc-watch-time",
    class: ""
  },
  {
    path: "/staff-management",
    title: "Quản lý nhân viên",
    icon: "nc-single-02",
    class: ""
  },
  {
    path: "/customer-management",
    title: "Quản lý khách hàng",
    icon: "nc-single-02",
    class: ""
  },
  {
    path: "/material-management",
    title: "Quản lý chất liệu",
    icon: "nc-atom",
    class: ""
  },
  {
    path: "/origin-management",
    title: "Quản lý xuất xứ",
    icon: "nc-shop",
    class: ""
  }
];

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  public menuItems: any[];

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
