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
import {RevertOrderComponent} from "../revert-order/revert-order.component";
import {RevertDetailComponent} from "../revert-detail/revert-detail.component";
import {EditAddressOrderComponent} from "../edit-address-order/edit-address-order.component";

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
  choXacNhan = 0;
  choLayHang = 0;
  dangGiao = 0;
  daNhan = 0;
  traHang = 0;
  daHuy = 0;
  daGiaoChoKhach = 0;
  orderDetails: any;
  isLoading!: boolean;
  searchOrderData: any;
  dataChangeAddressInOrder: any;

  constructor(
    private apiOrder: OrderService,
    private matDiaLog: MatDialog,
    private storageService: StorageService,
    private toastrService: ToastrService,
    private apiOrderDetail: OrderDetailService,
  ) {
  }

  ngOnInit(): void {
    this.findAllOrder();
  }

  createTabContent() {
    for (const x of this.orders) {
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
      // if (x.status == 5) {
      //   this.daGiaoChoKhach++;
      // }
      if (x.status == 6) {
        this.traHang++;
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
      // {
      //   status: 5, lable: 'Đã giao cho khách', sl: this.daGiaoChoKhach
      // },
      {
        status: 3, lable: 'Đã giao thành công', sl: this.daNhan
      },
      {
        status: 6, lable: 'Trả hàng', sl: this.traHang
      },
      {
        status: 4, lable: 'Đã huỷ', sl: this.daHuy
      }
    ]
  }

  resetNumber() {
    this.daNhan = 0;
    this.daGiaoChoKhach = 0;
    this.dangGiao = 0;
    this.traHang = 0;
    this.daHuy = 0;
    this.choXacNhan = 0;
    this.choLayHang = 0;
  }

  findAllOrder() {
    this.isLoading = true;
    this.searchOrderData = null;
    this.resetNumber();
    this.apiOrder.getALl().subscribe({
      next: (data: any) => {
        this.orders = data as any[];
        console.log(this.orders);
        this.findAllDetail();
        this.createTabContent();
        this.isLoading = false;
      }, error: err => {
        console.log(err);
        this.toastrService.error('Lỗi tải dữ liệu !');
        this.isLoading = false;
      }
    })
  }

  findAllDetail() {
    this.isLoading = true;
    this.apiOrderDetail.getAll().subscribe({
      next: (data: any) => {
        this.orderDetails = data as any[];
        this.isLoading = false;
      }, error: err => {
        console.log(err);
        this.toastrService.error('Lỗi tải dữ liệu !');
        this.isLoading = false;
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
    } else if (type == this.RESULT_CLOSE_DIALOG_ORDER.CANCEL) {
      title = 'Huỷ đơn hàng';
      message = 'Bạn có chắc chắn huỷ đơn hàng này?';
    } else if (type == this.RESULT_CLOSE_DIALOG_ORDER.START_DELIVERY) {
      title = 'Bắt đầu giao hàng';
      message = 'Bạn có chắc chắn bắt đầu giao hàng?';
    } else if (type == this.RESULT_CLOSE_DIALOG_ORDER.DONE) {
      title = 'Đã giao cho khách';
      message = 'Bạn có chắc chắn đã giao đơn hàng cho khách?';
    } else if (type == this.RESULT_CLOSE_DIALOG_ORDER.REVERT) {
      title = 'Khách từ chối nhận hàng';
      message = 'Bạn có chắc chắn khách từ chối nhận hàng?';
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
        if (type == this.RESULT_CLOSE_DIALOG_ORDER.CANCEL) {
          status = 4; //  Huỷ đơn hàng
          this.updateStatus(status, id);
        } else if (type == this.RESULT_CLOSE_DIALOG_ORDER.CONFIRM) {
          status = 1; //  nếu ấn vào xác nhận đơn hàng sẽ chuyển sang đang chuẩn bị hàng (xác nhận đơn hàng)
          this.apiOrder.findById(id).subscribe((data: any) => {
            if (data.status === 4) {
              this.toastrService.warning("Đơn hàng đã bị huỷ, vui lòng tải lại trang !");
              return
            } else {
              this.updateStatus(status, id);
            }
          })
        } else if (type == this.RESULT_CLOSE_DIALOG_ORDER.START_DELIVERY) {
          status = 2; // nếu ấn vào bắt đầu giao thì sẽ chuyển sang đang giao
          this.updateStatus(status, id);
        } else if (type == this.RESULT_CLOSE_DIALOG_ORDER.DONE) {
          status = 3; // Đã giao cho khách
          this.updateStatus(status, id);
        } else if (type == this.RESULT_CLOSE_DIALOG_ORDER.REVERT) {
          this.matDiaLog.open(RevertOrderComponent, {
            width: '500px',
            data: {}
          }).afterClosed().subscribe(data => {
            if (data !== 'close') {
              console.log(data);
              // Khách từ trối nhận hàng
              this.apiOrder.revertOrder(data, id).subscribe(() => {
                this.toastrService.success("Cập nhật thành công !");
                this.findAllOrder();
              });
            }
          })
        }
      }
    })
  }

  updateStatus(status: number, id: number) {
    this.apiOrder.updateStatus(status, id).subscribe({
      next: (_: any) => {
        this.findAllOrder();
      }, error: (err: any) => {
        this.toastrService.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    })
  }

  description(description: string) {
    this.matDiaLog.open(RevertDetailComponent, {
      width: '500px',
      data: {
        title: 'Lý do trả hàng !',
        message: description.trim().replace(/^\s+|\s+$|\s+(?=\s)/g, "")
      }
    })
  }

  searchOrder() {
    if (this.searchOrderData === null) {
      return;
    }
    this.isLoading = true;
    this.orders = [];
    this.resetNumber();
    this.createTabContent();
    this.apiOrder.findById(this.searchOrderData).subscribe({
      next: (data: any) => {
        if (data !== null) {
          this.orders.push(data);
          this.findAllDetail();
          this.createTabContent();
        }
        this.isLoading = false;
      }, error: err => {
        console.log('Lỗi rồi: ', err);
        this.isLoading = false;
      }
    })
  }

  openEditAddress(total: number, id: number) {
    this.apiOrder.findById(id).subscribe((data: any) => {
      if (data.status === 2) {
        this.toastrService.warning('Đơn hàng đã được giao, không thể chỉnh sửa !');
        return;
      } else {
        this.matDiaLog.open(EditAddressOrderComponent, {
          width: '1000px',
          disableClose: true,
          hasBackdrop: true,
          data: {
            total
          }
        }).afterClosed().subscribe(data => {
          if (data) {
            this.dataChangeAddressInOrder = {
              ...data, id
            };
            this.apiOrder.changeInfoOrder(this.dataChangeAddressInOrder).subscribe(_ => {
              this.toastrService.success("Chỉnh sửa thông tin giao hàng thành công !");
              this.findAllOrder();
            })
          }
        })
      }
    });
  }
}
