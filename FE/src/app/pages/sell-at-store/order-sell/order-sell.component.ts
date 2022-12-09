import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderDetailService} from "../../../shared/services/api-service-impl/orderDetail.service";
import {OrderService} from "../../../shared/services/api-service-impl/order.service";
import {Constants} from "../../../shared/Constants";

@Component({
  selector: 'app-order-sell',
  templateUrl: './order-sell.component.html',
  styleUrls: ['./order-sell.component.scss']
})
export class OrderSellComponent implements OnInit {

  orders: any[] = [];
  orderMoney: any[] = [];

  constructor(private matDataRef: MatDialogRef<OrderSellComponent>,
              @Inject(MAT_DIALOG_DATA) private id: any,
              private orderDetailService: OrderDetailService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderDetailService.findOrderDetailByOrder(this.id.id).subscribe((data: any) => {
      this.orders = data;
    });

    this.orderService.getOrderById(this.id.id).subscribe((rs: any) => {
      this.orderMoney = rs;
    })
  }

  close() {
    this.matDataRef.close();
  }

  export() {
    window.print();
    this.matDataRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
  }

}
