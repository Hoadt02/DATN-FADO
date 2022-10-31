import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProductDetailsService} from "../../../shared/services/api-service-impl/product-details.service";
import {OrderService} from "../../../shared/services/api-service-impl/order.service";
import {OrderDetailService} from "../../../shared/services/api-service-impl/orderDetail.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {Constants} from "../../../shared/Constants";

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

  products = [];
  orders = [];
  orderDetails = [];
  filterProduct;

  formGroup: FormGroup;

  constructor(private productDetailService: ProductDetailsService,
              private fb: FormBuilder,
              private orderService: OrderService,
              private orderDetailService: OrderDetailService,
              private matDiaLog: MatDialog,) {
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
      console.log(data);
    })
  }

  getAllOrderDetail() {
    this.orderDetailService.getAll().subscribe((data: any) => {
      this.orderDetails = data;
      console.log(data);
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
        this.tabs.push(`Hoá đơn ${this.tabs.length + 1}`);
        this.selected.setValue(this.tabs.length - 1);

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
        }
      }
    })
  }

  addOrder(id: any) {
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
        this.productDetailService.findProductDetail(id);
      }
    })
  }
}
