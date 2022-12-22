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
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any = [];
  voucherInput: any = null;
  discount: number = 0;

  phanTramDiscount = 0;

  TYPE_UPDATE_NUMBER_PRD = Contants.TYPE_UPDATE_NUMBER_PRD;
  RESULT_CLOSE_DIALOG = Contants.RESULT_CLOSE_DIALOG;
  dataAddToCart: any;
  subtotal: number = 0;
  total: number = 0;
  listPrdInCart: any;
  isLoading!: boolean;

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
  checkVoucher() {
    this.discount = 0;
    this.apiVoucher.checkVoucher(this.voucherInput).subscribe({
      next: (data: any) => {
        if (data != null) {
          this.toastrService.success("Áp mã giảm giá thành công!");
          if (data.type) {
            this.phanTramDiscount = data.discount; // lấy % discount để check sl sp thay đổi thì tính lại giảm giá
            this.discount = Math.round(this.subtotal * data.discount / 100);
          } else {
            this.discount = Math.round(data.discount);
          }
          this.total = this.subtotal - this.discount;
          if (this.total < 0) {
            this.total = 0;
          }
        } else {
          this.toastrService.error("Áp mã giảm giá thất bại!");
        }
      }, error: err => {
        console.log(err);
      }
    })
  }

  //Lấy ra tất cả sản phẩm trong giỏ hàng(láy ra các sản phẩm trong cart theo id người dùng)
  getAllPrdInCart() {
    this.isLoading = true;
    let slPrd = 0;
    this.apiCart.findAllByCustomerId(this.storageService.getIdFromToken()).subscribe({
      next: (data: any) => {
        this.listPrdInCart = data.id;
        this.subtotal = 0;
        this.items = data;
        for (const x of data) {
          this.subtotal += Math.round((x.price * x.quantity));
          slPrd += x.quantity
        }
        // cái này để check nếu % lớn hơn 0, nghĩa là mã đang km theo % thì nó sẽ tính lại
        if (this.phanTramDiscount > 0) {
          this.discount = Math.round(this.subtotal * this.phanTramDiscount / 100);
        }
        this.total = Math.round(this.subtotal - this.discount);
        if (this.total < 0) {
          this.total = 0;
        }
        this.apiCart.numberPrdInCart$.next(slPrd);
        this.isLoading = false;
      }, error: _ => {
        this.toastrService.error("Đã xảy ra lỗi từ hệ thống, vui lòng th lại sau !");
        this.isLoading = false;
      }
    });
  }

  // sửa số lượng sản phẩm
  checkDelete = false;

  updateQuantity(type: any, raw: any, event?: any) {
    let slSP = event?.target.value;

    if (slSP > raw.productDetail.quantity) {
      this.toastrService.warning('Sản phẩm chỉ còn ' + raw.productDetail.quantity + ' chiếc');
      event.target.value = raw.quantity;
      return;
    }
    if (slSP <= 0 || slSP === "") {
      this.checkDelete = true;
      this.deletePrd(raw.id);
      return;
    }
    this.dataCreate(raw.productDetail.id, parseInt(slSP));
    this.apiCart.updateQuantity(this.dataAddToCart);
    this.apiCart.isReLoading.subscribe(data => {
      if (data) {
        this.getAllPrdInCart();
        this.apiCart.isReLoading.next(false);
      }
    })
  }

  // xoá sản phẩm khỏi giỏ hàng
  deletePrd(idPrd: number) {
    const diaLogRef = this.matDiaLog.open(ConfirmDialogComponent, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: 'Xoá sản phẩm khỏi giỏ hàng!',
        message: 'Bạn có chắc chắn muốn xoá sản phẩm này ra khỏi giỏ hàng?',
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
      } else {
        if (this.checkDelete) {
          this.getAllPrdInCart();
          this.checkDelete = false;
        }
      }
    })
  }

  // mở checkout
  openCheckout() {
    this.apiCart.checkPromotionalInCartByIdCtm().subscribe(data => {
      if (data) {
        this.toastrService.warning("Khuyến mại không trùng khớp với sản phẩm trong giỏ hàng, vui lòng thử lại!");
        this.getAllPrdInCart();
        return;
      } else {
        this.apiCart.findAllByCustomerId(this.storageService.getIdFromToken()).subscribe({
          next: (data: any) => {
            for (const x of data) {
              for (const y of this.items) {
                if (x.productDetail.id == y.productDetail.id && x.productDetail.price != y.productDetail.price) {
                  this.toastrService.warning("Một vài sản phẩm không khớp, vui lòng thử lại!");
                  this.getAllPrdInCart();
                  return;
                }
              }
              if (0 == x.productDetail.status) {
                this.toastrService.warning(`Một vài sản phẩm không còn tồn tại, vui lòng xoá sản phẩm khỏi giỏ hàng và thử lại!`);
                this.getAllPrdInCart();
                return;
              }
              if (x.quantity > x.productDetail.quantity) {
                this.toastrService.warning(`sản phẩm ${x.productDetail.name.toUpperCase()} chỉ còn ${x.productDetail.quantity} sản phẩm.`);
                this.getAllPrdInCart();
                return;
              }
            }
            const discount = this.discount;
            const items = this.items;
            this.matDiaLog.open(CheckOutComponent, {
              width: '1000px',
              height: '77vh',
              minHeight: '77vh',
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
          }
        });
      }
    })
  }
}
