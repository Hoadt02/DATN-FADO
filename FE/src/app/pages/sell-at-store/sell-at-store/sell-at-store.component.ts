import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductDetailsService} from '../../../shared/services/api-service-impl/product-details.service';
import {StorageService} from '../../../shared/services/jwt/storage.service';
import {OrderService} from '../../../shared/services/api-service-impl/order.service';
import {OrderDetailService} from '../../../shared/services/api-service-impl/orderDetail.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../shared/confirm-dialog/confirm-dialog.component';
import {Constants} from '../../../shared/Constants';
import {CustomerFormComponent} from '../../customer-management/customer-form/customer-form.component';
import {CustomerService} from '../../../shared/services/api-service-impl/customer.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sell-at-store',
  templateUrl: './sell-at-store.component.html',
  styleUrls: ['./sell-at-store.component.scss']
})
export class SellAtStoreComponent implements OnInit {
  isLoading = true;
  RESULT_CLOSE_DIALOG = Constants.RESULT_CLOSE_DIALOG;
  TYPE_DIALOG = Constants.TYPE_DIALOG;

  tabs = [];
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
  idOrder: any;
  soHoaDon = 0;
  idHoaDon: any[] = [];
  price: number;
  tienKhachDua = 0;

  formGroup: FormGroup;
  full_name: string;

  listCustomer: any[] = [];
  datetime = new Date();


  constructor(private productDetailService: ProductDetailsService,
              private customerService: CustomerService,
              private fb: FormBuilder,
              private orderService: OrderService,
              private orderDetailService: OrderDetailService,
              private matDiaLog: MatDialog,
              private toastService: ToastrService,
              private storageService: StorageService,) {
    this.full_name = this.storageService.getFullNameFromToken();
  }

  ngOnInit(): void {
    this.setDataOrder();
    this.selectedTab = this.tabs;
    this.initForm();
    this.getAllNameProduct();
    this.getCustomerForCombobox();
    this.getOrderByStaff(this.storageService.getIdFromToken());
    this.getPayment();
  }

  // Phần của sơn
  openSave(type: any, row?: any) {
    const dialogRef = this.matDiaLog.open(CustomerFormComponent, {
      width: '780px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        type, row
      }
    });
    dialogRef.afterClosed().subscribe(rs => {
      if (rs == Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
        this.getCustomerForCombobox();
      }
    })
  }

  getCustomerForCombobox() {
    this.customerService.getAll().subscribe((data: any) => {
      if (data) {
        this.listCustomer = data;
      }
    });
  }

  //----------------------------------------------------------------------

  // Phần của vinh
  getAllNameProduct() {
    this.productDetailService.getAllProductDetail().subscribe((data: any) => {
      this.products = data;
      this.filterProduct = data;
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
    this.productDetailService.findProductByName(search).subscribe((data: any) => {
      this.filterProduct = data;
    })
  }

  addTab(selectAfterAdding: boolean) {
    const diaLogRef = this.matDiaLog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: 'Tạo hóa đơn',
        message: 'Bạn có muốn tạo hóa đơn không ?',
      }
    });
    diaLogRef.afterClosed().subscribe((data: any) => {
      if (data == this.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.orderService.save(this.createOrder).subscribe((data: any) => {
          this.idOrder = data.id;
          console.log(this.idOrder)

          this.soHoaDon++;
          this.idHoaDon.push({
            name: this.soHoaDon,
            value: data.id
          })
          this.orderDetailService.findOrderDetailByOrder(data.id).subscribe((data2: any) => {
            this.orderDetails = data2;
          })

          this.tabs.push(`Hoá đơn ${this.tabs.length + 1}`);
          this.selected.setValue(this.tabs.length - 1);
          this.toastService.success('Tạo hóa đơn thành công !');
          this.getOrderByStaff(this.storageService.getIdFromToken());
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
      width: '400px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: 'Xóa hóa đơn',
        message: 'Bạn có muốn xóa hóa đơn không ?',
      }
    });
    diaLogRef.afterClosed().subscribe((data: any) => {
      if (data == this.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.tabs.splice(index, 1);
        this.toastService.success('Xóa hóa đơn thành công !');
      }
    }, error => {
      this.toastService.warning('Xóa hóa đơn thất bại !')
    })
  }

  addOrder(idProduct: any) {
    const diaLogRef = this.matDiaLog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: 'Chọn sản phẩm',
        message: 'Bạn có muốn thêm sản phẩm vào hóa đơn không ?',
      }
    });
    diaLogRef.afterClosed().subscribe((data: any) => {
      if (data == this.RESULT_CLOSE_DIALOG.CONFIRM) {
        if (this.tabs.length == 0) {
          this.toastService.warning('Vui lòng tạo hóa đơn trước !');
        } else {
          this.productDetailService.findPriceProductDetail(idProduct).subscribe((data: any) => {
            this.orderDetailService.saveOrderDetail(this.createProductAtOrderDetail(idProduct, this.idOrder, data.price)).subscribe((data2: any) => {
              this.getOrderDetail();
              this.toastService.success('Thêm sản phẩm thành công !');
            }, error => {
              this.toastService.error('Thêm sản phẩm thất bại !');
              console.log(error)
            })
          })
        }
      }
    })
  }

  setDataOrder() {
    this.createOrder = {
      customer: {
        id: 195
      },
      staff: {
        id: this.storageService.getIdFromToken()
      },
      shipAddress: 'Tai quay',
      createDate: new Date(),
      paymentType: 0,
      status: 0,
      total: 0,
      discount: 0,
      totalPayment: 0,
    }
  }

  createProductAtOrderDetail(idProduct: number, idOrder: number, price: number) {
    const addProduct = {
      productDetail: {
        id: idProduct
      },
      order: {
        id: idOrder
      },
      quantity: 1,
      price: price
    };
    return addProduct;
  }

  getOrderDetailByOrder(name: number) {
    let id = this.idHoaDon.filter(n => n.name == name)[0].value;
    this.orderDetailService.findOrderDetailByOrder(id).subscribe((data: any) => {
      this.orderDetails = data;
    })
  }

  getOrderDetail() {
    this.orderDetailService.findOrderDetailByOrder(this.idOrder).subscribe((data: any) => {
      this.orderDetails = data;
    })
  }

  getOrderByStaff(id: number) {
    this.orderService.getOrderByStaff(id).subscribe((data: any) => {
      console.log(data);
    })
  }

  getPayment() {

  }

  payment() {
    this.toastService.warning('Đã làm gì đâu mà đòi thanh toán :))))))')
  }
}
