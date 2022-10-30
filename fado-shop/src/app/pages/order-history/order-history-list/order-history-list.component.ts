import {Component, OnInit} from '@angular/core';
import {Observable, Observer} from "rxjs";
import {OrderService} from "../../../shared/service/api-service-impl/order.service";
import {OrderDetailService} from "../../../shared/service/api-service-impl/orderDetail.service";
import {StorageService} from "../../../shared/service/jwt/storage.service";

@Component({
  selector: 'app-order-history-list',
  templateUrl: './order-history-list.component.html',
  styleUrls: ['./order-history-list.component.css']
})

export class OrderHistoryListComponent implements OnInit {

  orders: any[] = [];
  orderDetails: any[] = [];
  daMua = 0;
  daNhan = 0;
  daHuy = 0;
  dangGiao = 0;
  choXacNhan = 0;
  choLayHang = 0;

  constructor(
    private apiOrder: OrderService,
    private storageService: StorageService,
    private apiOrderDetail: OrderDetailService,
  ) {
  }

  ngOnInit(): void {
    this.findAllByCustomerId();
  }

  getSoLuong() {
    for (const x of this.orders) {
      this.daMua++;
      if (x.status == 0) {
        this.choXacNhan++;
      }
      if (x.status == 1) {
        this.choLayHang++;
      }
      if (x.status == 2) {
        this.dangGiao++;
      }
      if (x.status == 3) {
        this.daNhan++;
      }
      if (x.status == 4) {
        this.daHuy++;
      }
    }
  }

  findAllByCustomerId() {
    this.apiOrder.findAllByCustomerId(this.storageService.getIdFromToken()).subscribe({
      next: (data: any) => {
        this.orders = data as any[];
        this.getAllOrderDetail();
        this.getSoLuong();
      }
    })
  }

  getAllOrderDetail() {
    this.apiOrderDetail.getAll().subscribe({
      next: (data: any) => {
        this.orderDetails = data as any[];
      }
    })
  }
}
