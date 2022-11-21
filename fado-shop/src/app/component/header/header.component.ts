import {Component, OnInit} from '@angular/core';
import {CartService} from "../../shared/service/api-service-impl/cart.service";
import {StorageService} from "../../shared/service/jwt/storage.service";
import {AuthService} from "../../shared/service/jwt/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {Contants} from "../../shared/Contants";
import {ChangePasswordComponent} from "../../pages/change-password/change-password.component";
import {ProductDetailsService} from "../../shared/service/api-service-impl/product-details.service";
import {FormControl} from "@angular/forms";
import {BehaviorSubject, debounceTime, distinctUntilChanged} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  numberPrdInCart: number = 0;
  keyword = 'name';
  data:any[] = [];
  keySearch = new FormControl('');
  changeSearch: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private apiCart: CartService,
              public storageService: StorageService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private matDiaLog: MatDialog,
              private productDetailService: ProductDetailsService,) {
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
    this.apiCart.findAllByCustomerId(this.storageService.getIdFromToken()).subscribe({
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
    this.matDiaLog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Đăng xuất',
        message: 'Bạn muốn đăng xuất tài khoản này ?'
      }
    }).afterClosed().subscribe(result => {
      if (result == Contants.RESULT_CLOSE_DIALOG.CONFIRM){
        this.authService.logout();
      }
    })
  }

  redirectLogin(){
    if (this.router.url === '/auth/login'){
      return;
    }else if (this.router.url === '/auth/register'){
      void this.router.navigate(['/auth/login']);
    }else if (this.router.url === '/auth/forgot-password'){
      void this.router.navigate(['/auth/login']);
    } else {
      let params = this.route.snapshot.queryParams;
      if (params.redirectURL) return;
      void this.router.navigate(['/auth/login'],{queryParams:{redirectURL:this.router.url}});
    }
  }

  openChangePass() {
    this.matDiaLog.open(ChangePasswordComponent,{
      width: '400px',
      disableClose: true
    });
  }

  selectEvent($event: any) {
    let urlCurrent = '/product-detail/' + $event.id;
    if (this.router.url ===  urlCurrent) return;

    this.keySearch.reset();
    if (this.router.url.startsWith('/product-detail/')){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/product-detail/' + $event.id]));
    }else {
      void this.router.navigate(['/product-detail/' + $event.id]);
    }
  }

  onChangeSearch($event: any) {
    this.changeSearch.next($event);
    this.changeSearch.pipe(debounceTime(1000)).subscribe(value => {
       if (value !== ''){
         this.productDetailService.findProductByName(value).subscribe(data => {
           this.data = data;
         });
         this.changeSearch.next('');
       }
    })
  }

  onSubmitSearch(){
    try {
      if (this.keySearch.value?.trim().length == 0 || this.keySearch.value == null) return;
    }
    catch (e){return;}

    this.productDetailService.dataSearchFromHeader.next(this.keySearch.value);
    this.keySearch.reset();
    if (this.router.url === '/product'){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/product']));
    }else {
      void this.router.navigate(['/product']);
    }
  }
}
