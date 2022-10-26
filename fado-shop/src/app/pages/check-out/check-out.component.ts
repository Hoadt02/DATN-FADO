import {Component, Inject, OnInit} from '@angular/core';
import {CartService} from "../../shared/service/api-service-impl/cart.service";
import {CustomerService} from "../../shared/service/api-service-impl/customer.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import * as process from "process";
import {AddressService} from "../../shared/service/api-service-impl/address.service";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  subtotal: number = 0;
  total: number = 0;
  discount: any = 0;
  items: any;
  customer: any;
  address: any;
  idAddress: any;

  constructor(
    private apiCustomer: CustomerService,
    private apiCart: CartService,
    private apiAddress: AddressService,
    @Inject(MAT_DIALOG_DATA) private matDiaLogData: any,
  ) {
  }

  ngOnInit(): void {
    this.getAllPrdInCart();
    this.findById();
    this.findAddressByCustomerId();
  }

  findById() {
    this.apiCustomer.findById(164).subscribe(data => {
      this.customer = data;
      console.log('customer: ', data);
    })
  }

  findAddressByCustomerId() {
    this.apiAddress.findByCustomerId(164).subscribe({
      next: (data: any) => {
        this.address = data as any;
        console.log(this.address);
      }, error: err => {
        console.log("loi get addresss: ", err);
      }
    })
  }

  getAllPrdInCart() {
    this.items = this.matDiaLogData.items;
    this.discount = this.matDiaLogData.discount;
    this.subtotal = 0;
    for (const x of this.items) {
      this.subtotal += (x.productDetail.price * x.quantity);
    }
    this.total = this.subtotal - this.discount;
    if (this.total < 0) {
      this.total = 0;
    }
  }

}
