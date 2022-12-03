import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderDetailService} from "../../../shared/services/api-service-impl/orderDetail.service";
import {OrderService} from "../../../shared/services/api-service-impl/order.service";

@Component({
  selector: 'app-sell-history-detail',
  templateUrl: './sell-history-detail.component.html',
  styleUrls: ['./sell-history-detail.component.scss']
})
export class SellHistoryDetailComponent implements OnInit {

  orders: any[] = [];
  orderMoney: any[] = [];


  constructor(private matDataRef: MatDialogRef<SellHistoryDetailComponent>,
              @Inject(MAT_DIALOG_DATA) private dataDiaLog: any,
              private orderDetailService: OrderDetailService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderDetailService.findOrderDetailByOrder(this.dataDiaLog.row.id).subscribe((data: any) => {
      this.orders = data;
    });

    this.orderService.getOrderById(this.dataDiaLog.row.id).subscribe((rs: any) => {
      this.orderMoney = rs;
    })
  }

  close() {
    this.matDataRef.close();
  }

  export() {
    window.print();
  }

}
