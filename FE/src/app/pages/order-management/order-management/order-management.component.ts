import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from "../../../shared/services/api-service-impl/order.service";
import {StorageService} from "../../../shared/services/jwt/storage.service";
import {OrderDetailService} from "../../../shared/services/api-service-impl/orderDetail.service";
import {Constants} from "../../../shared/Constants";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {ToastrService} from "ngx-toastr";

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
    private matDiaLog: MatDialog,
    private storageService: StorageService,
    private toastrService: ToastrService,
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
    let title = '';
    let message = '';
    let status = -1;

    if (type == this.RESULT_CLOSE_DIALOG_ORDER.CONFIRM) {
      title = 'Xác nhận đơn hàng';
      message = 'Bạn có chắc chắn muốn xác nhận đơn hàng?';
    } else if (type == this.RESULT_CLOSE_DIALOG_ORDER.START_DELIVERY) {
      title = 'Bắt đầu giao hàng';
      message = 'Bạn có chắc chắn bắt đầu giao hàng?';
    }
    this.matDiaLog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title, message
      }
    }).afterClosed().subscribe(data => {
      if (data == this.RESULT_CLOSE_DIALOG.CONFIRM) {
        if (type == this.RESULT_CLOSE_DIALOG_ORDER.CONFIRM) {
          status = 1; //  nếu ấn vào xác nhận đơn hàng sẽ chuyển sang đang chuẩn bị hàng
          this.updateStatus(status, id);
        } else if (type == this.RESULT_CLOSE_DIALOG_ORDER.START_DELIVERY) {
          status = 2; // nếu ấn vào bắt đầu giao thì sẽ chuyển sang đang giao
          this.updateStatus(status, id);
        } else {
          console.log(1231231231232);
          // this.repurchase(id);
        }
      }
    })
  }

  updateStatus(status: number, id: number) {
    this.apiOrder.updateStatus(status, id).subscribe({
      next: (_: any) => {
        if (status == 4) {
          this.toastrService.success('Huỷ đơn hàng thành công!');
        } else {
          this.toastrService.success('Xác nhận đơn hàng thành công!');
        }
        this.findAllOrder();
      }, error: (err: any) => {
        this.toastrService.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    })
  }
}