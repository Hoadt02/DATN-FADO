import { Component, OnInit } from '@angular/core';
import {OrderDetailService} from "../../../shared/services/api-service-impl/orderDetail.service";

@Component({
  selector: 'app-sell-at-store-history',
  templateUrl: './sell-at-store-history.component.html',
  styleUrls: ['./sell-at-store-history.component.scss']
})
export class SellAtStoreHistoryComponent implements OnInit {

  listHistoryCancel: any[] = [];
  listHistoryPayment: any[] = [];

  constructor(private orderDetailService: OrderDetailService) { }

  ngOnInit(): void {
    this.getListHistory1();
    this.getListHistory2();
  }

  getListHistory1() {
    this.orderDetailService.getHistory(4).subscribe((data: any) => {
      this.listHistoryCancel = data;
      console.log('danh sach hoa don huy: ', data)
    })
  }

  getListHistory2() {
    this.orderDetailService.getHistory(3).subscribe((data: any) => {
      this.listHistoryPayment = data;
      console.log('danh sach hoa don mua: ', data)
    })
  }

}
