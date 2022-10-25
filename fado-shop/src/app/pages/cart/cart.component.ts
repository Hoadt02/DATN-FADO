import {Component, OnInit} from '@angular/core';
import {CartService} from "../../shared/service/api-service-impl/cart.service";
import {Contants} from "../../shared/Contants";
import * as Constants from "constants";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any = [];
  TYPE_UPDATE_NUMBER_PRD = Contants.TYPE_UPDATE_NUMBER_PRD;
  RESULT_CLOSE_DIALOG = Contants.RESULT_CLOSE_DIALOG;
  dataAddToCart: any;
  total: number = 0;

  constructor(
    private readonly apiCart: CartService,
    private matDiaLog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAllPrdInCart();
  }

  getAllPrdInCart() {
    let slPrd = 0;
    this.apiCart.findAllByCustomerId(164).subscribe({
      next: (data: any) => {
        this.items = data as any;
        this.total = 0;
        for (const x of data) {
          slPrd += x.quantity
          this.total += (x.productDetail.price * x.quantity)
        }
        this.apiCart.numberPrdInCart$.next(slPrd);
      }
    });
  }

  updateQuantity(type: any, idPrd: number, event?: any) {
    const slSP = event?.target.value;
    // if (type === this.TYPE_UPDATE_NUMBER_PRD.MINUS) {
    // } else if (type === this.TYPE_UPDATE_NUMBER_PRD.PLUS) {
    // } else {
      this.dataCreate(idPrd, parseInt(slSP))
      this.apiCart.updateQuantity(this.dataAddToCart);
      this.apiCart.isReLoading.subscribe(data => {
        if (data) {
          this.getAllPrdInCart();
        }
      })
    // }
    if (slSP === '') {
      console.log('Ban co muon xoa ko');
    }
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

}
