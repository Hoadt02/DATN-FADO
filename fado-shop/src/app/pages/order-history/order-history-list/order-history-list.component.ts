import {Component, OnInit} from '@angular/core';
import {Observable, Observer} from "rxjs";
import {OrderService} from "../../../shared/service/api-service-impl/order.service";
import {OrderDetailService} from "../../../shared/service/api-service-impl/orderDetail.service";

@Component({
  selector: 'app-order-history-list',
  templateUrl: './order-history-list.component.html',
  styleUrls: ['./order-history-list.component.css']
})

export class OrderHistoryListComponent implements OnInit {

  orders: any[] = [];
  orderDetails: any[] = [];
  daMua = 0;
  daHuy = 0;

  constructor(
    private apiOrder: OrderService,
    private apiOrderDetail: OrderDetailService,
  ) {
  }

  ngOnInit(): void {
    this.findAllByCustomerId();
  }

  findAllByCustomerId() {
    this.apiOrder.findAllByCustomerId(164).subscribe({
      next: (data: any) => {
        this.orders = data as any[];
        this.getAllOrderDetail();
        this.daMua = this.orders.length;
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
