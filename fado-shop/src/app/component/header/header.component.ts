import {Component, OnInit} from '@angular/core';
import {CartService} from "../../shared/service/api-service-impl/cart.service";
import {StorageService} from "../../shared/service/jwt/storage.service";
import {AuthService} from "../../shared/service/jwt/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  numberPrdInCart: number = 0;

  constructor(private apiCart: CartService,
              public storageService: StorageService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllPrdInCart();
    this.apiCart.numberPrdInCart$.subscribe(data => {
      this.numberPrdInCart = data;
    });
    this.storageService.getFullNameFromToken();
    //
    // this.apiCart.listProductInCart$.subscribe(data => {
    //   console.log('header: ', data);
    // });
  }

  getAllPrdInCart() {
    let slPrd = 0;
    this.apiCart.findAllByCustomerId(164).subscribe({
      next: (data: any) => {
        for (const x of data) {
          slPrd += x.quantity
        }
        this.apiCart.numberPrdInCart$.next(slPrd);
        // this.apiCart.listProductInCart$.next(data);
      }
    });
  }

  logout(){
    this.authService.logout();
  }

  redirectLogin(){
    if (this.router.url === '/auth/login'){
      return;
    }else if (this.router.url === '/auth/register'){
      void this.router.navigate(['/auth/login']);
    }else {
      let params = this.route.snapshot.queryParams;
      if (params.redirectURL) return;
      void this.router.navigate(['/auth/login'],{queryParams:{redirectURL:this.router.url}});
    }
  }
}
