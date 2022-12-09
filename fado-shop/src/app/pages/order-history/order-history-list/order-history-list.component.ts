import {Component, OnInit} from '@angular/core';
import {Observable, Observer} from "rxjs";
import {OrderService} from "../../../shared/service/api-service-impl/order.service";
import {OrderDetailService} from "../../../shared/service/api-service-impl/orderDetail.service";
import {StorageService} from "../../../shared/service/jwt/storage.service";
import {Contants} from "../../../shared/Contants";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {ToastrService} from "ngx-toastr";
import {CartService} from "../../../shared/service/api-service-impl/cart.service";
import {Router} from "@angular/router";
import {yearsPerPage} from "@angular/material/datepicker";
import {EditAddressComponent} from "../../check-out/edit-address/edit-address.component";
import {AddressService} from "../../../shared/service/api-service-impl/address.service";
import {RevertDetailComponent} from "../revert-detail/revert-detail.component";
import {EditAddressFormComponent} from "../../check-out/edit-address-form/edit-address-form.component";
import {EditAddressOrderComponent} from "../edit-address-order/edit-address-order.component";

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
  choXacNhan = 0;
  choLayHang = 0;
  dangGiao = 0;
  daNhan = 0;
  daHuy = 0;
  daGiao = 0;
  traHang = 0;
  listMatTab: any;
  dataAddCart: any = [];
  isLoading!: boolean;
  searchOrderData: any;
  dataChangeAddressInOrder: any;

  constructor(
    private apiOrder: OrderService,
    private storageService: StorageService,
    private apiOrderDetail: OrderDetailService,
    private matDiaLog: MatDialog,
    private apiAddress: AddressService,
    private toastrService: ToastrService,
    private apiCart: CartService,
    private router: Router,
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
      // if (x.status == 5) {
      //   this.daGiao++;
      // }
      if (x.status == 6) {
        this.traHang++;
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
      //   status: 5, lable: 'Đã giao', sl: this.daGiao
      // },
      {
        status: 3, lable: 'Đã nhận', sl: this.daNhan
      },
      {
        status: 4, lable: 'Đã huỷ', sl: this.daHuy
      },
      {
        status: 6, lable: 'Trả hàng', sl: this.traHang
      }
    ]
  }

  resetNumber() {
    this.daMua = 0;
    this.daNhan = 0;
    this.daHuy = 0;
    this.dangGiao = 0;
    this.daGiao = 0;
    this.traHang = 0;
    this.choXacNhan = 0;
    this.choLayHang = 0;
  }

  findAllByCustomerId() {
    this.isLoading = true;
    this.searchOrderData = null;
    this.resetNumber();
    this.apiOrder.findAllByCustomerId(this.storageService.getIdFromToken()).subscribe({
      next: (data: any) => {
        this.orders = data as any[];
        this.findAllDetailByCustomerId();
        this.getSoLuong();
        this.isLoading = false;
      }
    })
  }

  findAllDetailByCustomerId() {
    this.isLoading = true;
    this.apiOrderDetail.findAllDetailByCustomerId(this.storageService.getIdFromToken()).subscribe({
      next: (data: any) => {
        this.orderDetails = data as any[];
        this.isLoading = false;
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
      title = 'Đặt lại đơn hàng';
      message = 'Bạn có chắc chắn muốn đặt lại đơn hàng?';
    }
    // else if (type == this.RESULT_CLOSE_DIALOG_ORDER.HasReceivedTheGoods) {
    //   title = 'Đã nhận hàng';
    //   message = 'Bạn có chắc chắn là đã nhận đơn hàng?';
    // }
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
          this.apiOrder.findById(id).subscribe((data: any) => {
            if (data.status === 1) {
              this.toastrService.warning("Đơn hàng này đã được xác nhận, vui lòng tải lại trang!");
              return;
            } else {
              this.updateCancelAndReceived(status, id);
            }
          })
        } else if (type == this.RESULT_CLOSE_DIALOG_ORDER.HasReceivedTheGoods) {
          status = 3; // nếu ấn vào đã nhận hàng thì trạng thái về đẫ giao
          this.updateCancelAndReceived(status, id);
        } else {
          this.repurchase(id);
        }
      }
    })
  }

  updateCancelAndReceived(status: number, id: number) {
    this.apiOrder.updateStatus(status, id).subscribe({
      next: (_: any) => {
        this.findAllByCustomerId();
      }, error: (err: any) => {
        this.toastrService.error('Đã xảy ra lỗi!');
        console.log(err);
      }
    })
  }

  repurchase(id: number) {
    let title = '';
    let message = '';
    let inF = 0;
    let outF = 0;
    this.apiOrderDetail.findAllByOrderId(id).subscribe((res: any) => {
      for (const x of res) {
        outF++;
        if (x.productDetail.quantity >= 1 && x.productDetail.status == 1) {
          inF++;
          this.dataAddCart.push({
            productDetail: {
              id: x.productDetail.id
            },
            customer: {
              id: this.storageService.getIdFromToken(),
            },
            quantity: 1,
          })
        }
      }
      if (inF == 0) {
        this.toastrService.warning('Tất cả sản phẩm đã không còn hợp lệ');
        return;
      } else if (outF != inF && inF > 0) {
        title = 'Một vài sản phẩm không còn hợp lệ';
        message = 'Bạn chắc chắn muốn tiếp tục?';
        this.matDiaLog.open(ConfirmDialogComponent, {
          width: '400px',
          data: {
            title, message
          }
        }).afterClosed().subscribe(data => {
          if (data == this.RESULT_CLOSE_DIALOG.CONFIRM) {
            for (const y of this.dataAddCart) {
              this.apiCart.addToCart(y);
            }
            setTimeout(() => {
              this.toastrService.info("Đã chuyển hướng đến rỏ hàng");
              this.router.navigate(['/cart']);
            }, 2100);
          }
        })
      } else {
        for (const y of this.dataAddCart) {
          this.apiCart.addToCart(y);
        }
        setTimeout(() => {
          this.toastrService.info("Đã chuyển hướng đến rỏ hàng");
          this.router.navigate(['/cart']);
        }, 2100);
      }
    })
  }

  description(description: string) {
    this.matDiaLog.open(RevertDetailComponent, {
      width: '500px',
      data: {
        title: 'Lý do trả hàng !',
        message: description
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
    this.getSoLuong();
    this.apiOrder.findById(this.searchOrderData).subscribe({
      next: (data: any) => {
        if (data !== null) {
          this.orders.push(data);
          this.findAllDetailByCustomerId();
          this.getSoLuong();
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
      if (data.status === 1) {
        this.toastrService.warning('Đơn hàng đã được xác nhận, vui lòng liên hệ admin !');
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
              this.findAllByCustomerId();
            })
          }
        })
      }
    });
  }

}
