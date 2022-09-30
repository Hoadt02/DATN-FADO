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
