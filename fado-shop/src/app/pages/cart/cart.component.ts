import {Component, OnInit} from '@angular/core';
import {CartService} from "../../shared/service/api-service-impl/cart.service";
import {Contants} from "../../shared/Contants";
import * as Constants from "constants";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {debounceTime, Subject} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {VoucherService} from "../../shared/service/api-service-impl/voucher.service";
import {CheckOutComponent} from "../check-out/check-out.component";
import {StorageService} from "../../shared/service/jwt/storage.service";
import {ProductPromotionalService} from "../../shared/service/api-service-impl/product-promotional.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any = [];
  vouchers: any = [];
  voucherInput: any = null;
  discount: number = 0;
  productPromotional: any;

  TYPE_UPDATE_NUMBER_PRD = Contants.TYPE_UPDATE_NUMBER_PRD;
  RESULT_CLOSE_DIALOG = Contants.RESULT_CLOSE_DIALOG;
  dataAddToCart: any;
  subtotal: number = 0;
  total: number = 0;

  constructor(
    private readonly apiCart: CartService,
    private readonly apiVoucher: VoucherService,
    private readonly apiProductPromotional: ProductPromotionalService,
    private storageService: StorageService,
    private matDiaLog: MatDialog,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getAllPrdInCart();
    this.getAllVoucher();
  }

  //data thêm vào cart
  dataCreate(idPrd: number, sl: number) {
    this.dataAddToCart = {
      productDetail: {
        id: idPrd,
      },
      customer: {
        id: this.storageService.getIdFromToken(),
      },
      quantity: sl,
    };
  }

  // lấy ra danh sách voucher
  getAllVoucher() {
    this.apiVoucher.getAll().subscribe({
      next: (data: any) => {
        for (const x of data) {
          this.vouchers.push({
            code: x.code,
            discount: x.discount,
            status: x.status,
          });
        }
      }, error: err => {
        console.log(err);
      }
    })
  }

  //Lấy ra tất cả sản phẩm trong rỏ hàng(láy ra các sản phẩm trong cart theo id người dùng)
  getAllPrdInCart() {
    let slPrd = 0;
    this.apiCart.findAllByCustomerId(this.storageService.getIdFromToken()).subscribe({
      next: (data: any) => {
        this.subtotal = 0;
        this.discount = 0;
        this.items = data;
        for (const x of data) {
          this.subtotal += Math.round((x.price * x.quantity));
          slPrd += x.quantity
        }
        this.total = Math.round(this.subtotal - this.discount);
        if (this.total < 0) {
          this.total = 0;
        }
        this.apiCart.numberPrdInCart$.next(slPrd);
      }
    });
  }

  // sửa số lượng sản phẩm
  updateQuantity(type: any, raw: any, event?: any) {
    let slSP = event?.target.value;

    if (slSP > raw.productDetail.quantity) {
      this.toastrService.warning('Sản phẩm chỉ còn ' + raw.productDetail.quantity + ' chiếc');
      event.target.value = raw.quantity;
      return;
    }
    if (slSP <= 0 || slSP === "") {
      this.deletePrd(raw.id);
      return;
    }
    this.dataCreate(raw.productDetail.id, parseInt(slSP));
    this.apiCart.updateQuantity(this.dataAddToCart);
    this.getAllPrdInCart();
  }

  // xoá sản phẩm khỏi rỏ hàng
  deletePrd(idPrd: number) {
    const diaLogRef = this.matDiaLog.open(ConfirmDialogComponent, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: 'Xoá sản phẩm khỏi giỏ hàng!',
        message: 'Bạn có chắc chắn muốn xoá sản phẩm này ra khỏi rỏ hàng?',
      }
    });
    diaLogRef.afterClosed().subscribe(data => {
      if (data == this.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.apiCart.delete(idPrd);
        this.apiCart.isReLoading.subscribe(data => {
          if (data) {
            this.getAllPrdInCart();
            this.apiCart.isReLoading.next(false);
          }
        })
      }
    })
  }

  //Thêm voucher
  applyVoucher() {
    let checkVoucher = false;
    for (const x of this.vouchers) {
      if (x.code == this.voucherInput && x.status == 1) {
        this.discount = x.discount;
        this.total = this.subtotal - this.discount;
        if (this.total < 0) {
          this.total = 0;
        }
        this.apiCart.discount$.next(this.discount);
        localStorage.setItem('discount', String(this.discount));
        checkVoucher = true;
      }
    }
    if (checkVoucher) {
      this.toastrService.success('Áp voucher thành công. Đơn hàng được giảm: ' + this.discount);
      console.log("Voucher khớp, được giảm: ", this.discount);
    } else {
      this.toastrService.warning('Voucher không hợp lệ!');
    }
  }

  // mở checkout
  openCheckout() {
    if (this.items.length == 0) {
      this.toastrService.warning('Giỏ hàng của bạn đang trống, vui lòng thêm sản phẩm rồi tiến hành đặt hàng!');
      return;
    }
    this.apiCart.findAllByCustomerId(this.storageService.getIdFromToken()).subscribe((data: any) => {
      for (const x of data) {
        if (x.quantity > x.productDetail.quantity) {
          this.toastrService.warning(`sản phẩm ${x.productDetail.name.toUpperCase()} chỉ còn ${x.productDetail.quantity} sản phẩm.`);
          return;
        }
      }
      const discount = this.discount;
      const items = this.items;
      this.matDiaLog.open(CheckOutComponent, {
        width: '1000px',
        hasBackdrop: true,
        disableClose: true,
        data: {
          discount, items
        }
      }).afterClosed().subscribe(data => {
        if (data == this.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.getAllPrdInCart();
        }
      })
    })
  }
}
