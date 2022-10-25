import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../shared/service/api-service-impl/category.service";
import {ProductService} from "../../shared/service/api-service-impl/product.service";
import {CartService} from "../../shared/service/api-service-impl/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  numberPrdInCart: number = 0;

  constructor(private apiCart: CartService) {
  }

  ngOnInit(): void {
    this.getAllPrdInCart();
    this.apiCart.numberPrdInCart$.subscribe(data => {
      this.numberPrdInCart = data;
    })
  }

  getAllPrdInCart() {
    let slPrd = 0;
    this.apiCart.findAllByCustomerId(164).subscribe({
      next: (data: any) => {
        for (const x of data) {
          slPrd += x.quantity
        }
        this.apiCart.numberPrdInCart$.next(slPrd);
      }
    });
  }
}
