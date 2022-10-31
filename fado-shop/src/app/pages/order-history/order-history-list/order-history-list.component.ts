import {Component, OnInit} from '@angular/core';
import {Observable, Observer} from "rxjs";
import {OrderService} from "../../../shared/service/api-service-impl/order.service";
import {OrderDetailService} from "../../../shared/service/api-service-impl/orderDetail.service";
import {StorageService} from "../../../shared/service/jwt/storage.service";
import {Contants} from "../../../shared/Contants";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-order-history-list',
  templateUrl: './order-history-list.component.html',
  styleUrls: ['./order-history-list.component.css']
})

export class OrderHistoryListComponent implements OnInit {

  RESULT_CLOSE_DIALOG_ORDER = Contants.RESULT_CLOSE_DIALOG_ORDER;
  RESULT_CLOSE_DIALOG = Contants.RESULT_CLOSE_DIALOG;
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
    private matDiaLog: MatDialog,
    private toastrService: ToastrService,
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
        this.daMua = 0;
        this.daNhan = 0;
        this.daHuy = 0;
        this.dangGiao = 0;
        this.choXacNhan = 0;
        this.choLayHang = 0;
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

  updateStatusOrder(type: any, id: number) {
    let title = '';
    let message = '';
    let status = -1;

    if (type == this.RESULT_CLOSE_DIALOG_ORDER.Cancel) {
      title = 'Huỷ đơn hàng';
      message = 'Bạn có chắc chắn muốn huỷ đơn hàng?';
    } else if (type == this.RESULT_CLOSE_DIALOG_ORDER.Repurchase) {
      title = 'Đặt lại đơn hàng ----- Chưa xử lý';
      message = 'Bạn có chắc chắn muốn đặt lại đơn hàng?';
    } else if (type == this.RESULT_CLOSE_DIALOG_ORDER.HasReceivedTheGoods) {
      title = 'Đã nhận hàng';
      message = 'Bạn có chắc chắn là đã nhận đơn hàng?';
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
        if (type == this.RESULT_CLOSE_DIALOG_ORDER.Cancel) {
          status = 4; //  nếu ấn vào huỷ đơn hàng thì trạng thái sẽ = trạng thái đã huỷ
        } else if (type == this.RESULT_CLOSE_DIALOG_ORDER.HasReceivedTheGoods) {
          status = 3; // nếu ấn vào đã nhận hàng thì trạng thái về đẫ giao
        }
        // else if (data == this.RESULT_CLOSE_DIALOG_ORDER.Repurchase) {
        //   status = 0; // ấn mua lại thì tạo thêm đơn hàng mới rôì xác nhận lại
        // }
        console.log('Status: ', status)
        console.log('id đơn hàng: ', id)
        this.apiOrder.updateStatus(status, id).subscribe({
          next: (data: any) => {
            this.toastrService.success('Thay đổi trạn thái đơn hàng thành công!');
            console.log('Update xong: ', data);
            this.findAllByCustomerId();
          }, error: (err: any) => {
            this.toastrService.error('Lỗi sửa đổi trạng thái đơn hàng!');
            console.log(err);
          }
        })
      }
    })
  }
}
