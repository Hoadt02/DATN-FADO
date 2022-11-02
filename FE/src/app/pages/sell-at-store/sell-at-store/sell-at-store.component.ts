import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProductDetailsService} from "../../../shared/services/api-service-impl/product-details.service";
import {StorageService} from '../../../shared/services/jwt/storage.service';
import {OrderService} from "../../../shared/services/api-service-impl/order.service";
import {OrderDetailService} from "../../../shared/services/api-service-impl/orderDetail.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {Constants} from "../../../shared/Constants";
import {ToastrService} from "ngx-toastr";
import {CartService} from "../../../shared/services/api-service-impl/cart.service";

@Component({
  selector: 'app-sell-at-store',
  templateUrl: './sell-at-store.component.html',
  styleUrls: ['./sell-at-store.component.scss']
})
export class SellAtStoreComponent implements OnInit {

  RESULT_CLOSE_DIALOG = Constants.RESULT_CLOSE_DIALOG;

  tabs = ['Hóa đơn 1'];
  selectedTab: any;
  selected = new FormControl(0);

  products: any[] = [];
  findByIdOrder: any[] = []
  orders: any[] = [];
  orderDetails: any[] = [];
  carts: any[] = [];
  filterProduct: any;
  dataOrder: any;
  dataOrderDetail: any;
  checkQuantity = false;
  createOrder: any;

  formGroup: FormGroup;
  full_name: string;

  constructor(private productDetailService: ProductDetailsService,
              private fb: FormBuilder,
              private orderService: OrderService,
              private orderDetailService: OrderDetailService,
              private cartService: CartService,
              private matDiaLog: MatDialog,
              private toastService: ToastrService,
              private storageService: StorageService,) {
    this.full_name = this.storageService.getFullNameFromToken();

  }

  ngOnInit(): void {
    this.selectedTab = this.tabs;
    this.initForm();
    this.getAllOrder();
    this.getAllOrderDetail();
    this.getAllNameProduct();
  }

  getAllNameProduct() {
    this.productDetailService.getAllProductDetail().subscribe((data: any) => {
      this.products = data;
      this.filterProduct = data;
    })
  }

  getAllOrder() {
    this.orderService.getALl().subscribe((data: any) => {
      this.orders = data;
    })
  }

  getAllOrderDetail() {
    this.orderDetailService.getAll().subscribe((data: any) => {
      this.orderDetails = data;
    })
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: [''],
    })
    this.formGroup.get('name').valueChanges.subscribe((data: any) => {
      this.onChangeSearch(data);
    })
  }

  onChangeSearch(search) {
    // this.filterProduct = this.products.filter(item => {
    //   return item.toString().toLowerCase().indexOf(search.toLowerCase()) > -1;
    // })
    this.productDetailService.findProductByName(search).subscribe((data: any) => {
      this.filterProduct = data;
    })
  }

  addTab(selectAfterAdding: boolean) {
    const diaLogRef = this.matDiaLog.open(ConfirmDialogComponent, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: 'Tạo hóa đơn',
        message: 'Bạn có muốn tạo hóa đơn không ?',
      }
    });
    diaLogRef.afterClosed().subscribe((data: any) => {
      if (data == this.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.createOrder = {
          customer: {
            id: 194
          },
          staff: {
            id: this.storageService.getIdFromToken()
          },
          shipAddress: 'Tai quay',
          createDate: new Date(),
          paymentType: 0,
          status: 1,
          total: 0,
          discount: 0,
          totalPayment: 0,
        }

        this.orderService.save(this.createOrder).subscribe((data: any) => {
          console.log(data)
          this.tabs.push(`Hoá đơn ${this.tabs.length + 1}`);
          this.selected.setValue(this.tabs.length - 1);
          this.toastService.success('Tạo hóa đơn thành công !');
        }, error => {
          this.toastService.error('Tạo hóa đơn thất bại !')
          console.log(error)
          return;
        })
      }
    })
  }

  removeTab(index: number) {
    const diaLogRef = this.matDiaLog.open(ConfirmDialogComponent, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: 'Xóa hóa đơn',
        message: 'Bạn có muốn xóa hóa đơn không ?',
      }
    });
    diaLogRef.afterClosed().subscribe((data: any) => {
      if (data == this.RESULT_CLOSE_DIALOG.CONFIRM) {
        if (this.tabs.length > 1) {
          this.tabs.splice(index, 1);
        } else {
          this.toastService.warning('Không thể xóa hóa đơn mặc định !');
          return;
        }
      }
    })
  }

  addOrder(idProduct: any) {
    const diaLogRef = this.matDiaLog.open(ConfirmDialogComponent, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: 'Chọn sản phẩm',
        message: 'Bạn có muốn thêm sản phẩm vào hóa đơn không ?',
      }
    });
    diaLogRef.afterClosed().subscribe((data: any) => {
      if (data == this.RESULT_CLOSE_DIALOG.CONFIRM) {
        const quantityProduct = 1;
        if (quantityProduct > this.filterProduct.quantity) {
          this.checkQuantity = true;
        } else {
          for (const c of this.carts) {
            if (c.filterProduct.id == idProduct && (c.quantity + quantityProduct) > this.filterProduct.quantity) {
              this.toastService.warning('Sắp hết hàng !');
              return;
            }
          }
          const createCart = {
            productDetail: {
              id: idProduct
            },
            customer: {
              id: 194
            },
            quantity: quantityProduct,
          };
          this.cartService.addToCart(createCart);
          this.cartService.isReLoading.subscribe((data) => {
            if (data) {
              this.cartService.isReLoading.next(false)
            }
          })
        }
      }
    })
  }

}
