import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../shared/services/api-service-impl/order.service";
import {StorageService} from "../../../shared/services/jwt/storage.service";
import {OrderDetailService} from "../../../shared/services/api-service-impl/orderDetail.service";
import {Constants} from "../../../shared/Constants";

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit {
  panelOpenState = false;
  RESULT_CLOSE_DIALOG_ORDER = Constants.RESULT_CLOSE_DIALOG_ORDER;
  RESULT_CLOSE_DIALOG = Constants.RESULT_CLOSE_DIALOG;

  listMatTab: any;
  orders: any = [];
  tongDonHangOnline = 0;
  tongDonHangOffline = 0;
  choXacNhan = 0;
  choLayHang = 0;
  dangGiao = 0;
  daNhan = 0;
  daHuy = 0;
  orderDetails: any;

  constructor(
    private apiOrder: OrderService,
    private storageService: StorageService,
    private apiOrderDetail: OrderDetailService,
  ) {
  }

  ngOnInit(): void {
    this.createTabContent();
    this.findAllOrder();
  }

  createTabContent() {
    for (const x of this.orders) {
      if (x.type == 0) {
        this.tongDonHangOnline++;
      }
      if (x.type == 1) {
        this.tongDonHangOffline++;
      }
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
    this.listMatTab = [
      {
        status: 0, lable: 'Chờ xác nhận', sl: this.choXacNhan
      },
      {
        status: 1, lable: 'Chờ lấy hàng', sl: this.choLayHang
      },
      {
        status: 2, lable: 'Đang giao', sl: this.dangGiao
      },
      {
        status: 3, lable: 'Đã giao', sl: this.daNhan
      },
      {
        status: 4, lable: 'Đã huỷ', sl: this.daHuy
      }
    ]
  }

  findAllOrder() {
    this.tongDonHangOffline = 0;
    this.tongDonHangOnline = 0;
    this.daNhan = 0;
    this.daHuy = 0;
    this.dangGiao = 0;
    this.choXacNhan = 0;
    this.choLayHang = 0;
    this.apiOrder.getALl().subscribe({
      next: (data: any) => {
        console.log(data);
        this.orders = data as any[];
        this.findAllDetail();
        this.createTabContent();
      }
    })
  }

  findAllDetail() {
    this.apiOrderDetail.getAll().subscribe({
      next: (data: any) => {
        console.log('prd: ', data);
        this.orderDetails = data as any[];
      }
    })
  }

  updateStatusOrder(type: string, id) {

  }
}
