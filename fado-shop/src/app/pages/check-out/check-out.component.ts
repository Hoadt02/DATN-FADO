import {Component, OnInit} from '@angular/core';
import {CartService} from "../../shared/service/api-service-impl/cart.service";
import {CustomerService} from "../../shared/service/api-service-impl/customer.service";

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

  constructor(
    private apiCustomer: CustomerService,
    private apiCart: CartService
  ) {
  }

  ngOnInit(): void {
    this.getAllPrdInCart();
    this.discount = localStorage.getItem('discount');
    this.findById();
  }

  findById() {
    this.apiCustomer.findById(164).subscribe(data => {
      this.customer = data;
      console.log(this.customer);
    })
  }

  getAllPrdInCart() {
    this.apiCart.discount$.subscribe(data => {
      this.discount = data;
    });
    this.apiCart.findAllByCustomerId(164).subscribe({
      next: (data: any) => {
        this.items = data as any;
        this.subtotal = 0;
        for (const x of data) {
          this.subtotal += (x.productDetail.price * x.quantity);
        }
        this.total = this.subtotal - this.discount;
        if (this.total < 0) {
          this.total = 0;
        }
      }
    });
  }

}
