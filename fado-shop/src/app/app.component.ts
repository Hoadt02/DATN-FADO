import {Component} from '@angular/core';
import {CategoryService} from "./shared/service/api-service-impl/category.service";
import {ProductDetailsService} from "./shared/service/api-service-impl/product-details.service";
import {CartService} from "./shared/service/api-service-impl/cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fado-shop';

  // constructor(
  //   private readonly apiCart: CartService,
  // ) {
  // }
  //
  // ngOnInit(): void {
  //   this.getAllPrdInCart();
  // }
  //
  // getAllPrdInCart() {
  //   let slPrd = 0;
  //   this.apiCart.findAllByCustomerId(164).subscribe({
  //     next: (data: any) => {
  //       for (const x of data) {
  //         slPrd += x.quantity
  //       }
  //       this.apiCart.numberPrdInCart$.next(slPrd);
  //     }
  //   });
  // }
}
