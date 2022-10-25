import {Component, OnInit} from '@angular/core';
import {CartService} from "../../shared/service/api-service-impl/cart.service";
import {Contants} from "../../shared/Contants";
import * as Constants from "constants";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {debounceTime} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {VoucherService} from "../../shared/service/api-service-impl/voucher.service";

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

  TYPE_UPDATE_NUMBER_PRD = Contants.TYPE_UPDATE_NUMBER_PRD;
  RESULT_CLOSE_DIALOG = Contants.RESULT_CLOSE_DIALOG;
  dataAddToCart: any;
  subtotal: number = 0;
  total: number = 0;

  constructor(
    private readonly apiCart: CartService,
    private readonly apiVoucher: VoucherService,
    private matDiaLog: MatDialog,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getAllPrdInCart();
    this.getAllVoucher();
  }

  dataCreate(idPrd: number, sl: number) {
    this.dataAddToCart = {
      productDetail: {
        id: idPrd,
      },
      customer: {
        id: 164,
      },
      quantity: sl,
    };
  }

  getAllVoucher() {
    this.apiVoucher.getAll().subscribe({
      next: (data: any) => {
        for (const x of data) {
          this.vouchers.push({
            code: x.code,
            discount: x.discount,
          });
        }
        console.log('list voucher nè: ', this.vouchers);
      }, error: err => {
        console.log(err);
      }
    })
  }

  getAllPrdInCart() {
    let slPrd = 0;
    this.apiCart.findAllByCustomerId(164).subscribe({
      next: (data: any) => {
        this.items = data as any;
        this.subtotal = 0;
        for (const x of data) {
          slPrd += x.quantity
          this.subtotal += (x.productDetail.price * x.quantity);
        }
        this.total = this.subtotal - this.discount;
        if (this.total < 0) {
          this.total = 0;
        }
        this.apiCart.numberPrdInCart$.next(slPrd);
      }
    });
  }

  updateQuantity(type: any, idPrd: number, event?: any) {
    let slSP = event?.target.value;
    for (const x of this.items) {
      if (x.productDetail.id == idPrd && slSP > x.productDetail.quantity) {
        this.toastrService.warning('Sản phẩm chỉ còn ' + x.productDetail.quantity + ' chiếc');
        return;
      }
    }
    if (slSP == 0 || slSP === "") {
      slSP = 1;
    }
    this.dataCreate(idPrd, parseInt(slSP));
    this.apiCart.updateQuantity(this.dataAddToCart);
    this.apiCart.isReLoading.subscribe(data => {
      if (data) {
        this.getAllPrdInCart();
      }
    })
  }

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

  applyVoucher() {
    console.log(this.voucherInput);
    for (const x of this.vouchers) {
      if (x.code == this.voucherInput) {
        this.discount = x.discount;
        this.total = this.subtotal - this.discount;
        if (this.total < 0) {
          this.total = 0;
        }
        this.toastrService.success('Áp voucher thành công. Đơn hàng được giảm: ' + this.discount);
        console.log("Voucher khớp, được giảm: ", this.discount);
      }
    }
  }
}
