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
import {PromotionalService} from "../../../shared/services/api-service-impl/promotional.service";
import {ProductPromotionalService} from "../../../shared/services/api-service-impl/product-promotional.service";

@Component({
  selector: 'app-sell-at-store',
  templateUrl: './sell-at-store.component.html',
  styleUrls: ['./sell-at-store.component.scss']
})
export class SellAtStoreComponent implements OnInit {
  isLoading = true;
  RESULT_CLOSE_DIALOG = Constants.RESULT_CLOSE_DIALOG;
  TYPE_DIALOG = Constants.TYPE_DIALOG;
  TYPE_UPDATE_NUMBER_PRD = Constants.TYPE_UPDATE_NUMBER_PRD;

  tabs = [];
  selectedTab: any;
  selected = new FormControl(0);

  products: any[] = [];
  findByIdOrder: any[] = []
  orders: any[] = [];
  orderDetails: any[] = [];
  carts: any[] = [];
  addProduct: any;
  filterProduct: any;
  dataOrder: any;
  dataOrderDetail: any;
  checkQuantity = false;
  createOrder: any;
  idOrder: any;
  soHoaDon = 0;
  idHoaDon: any[] = [];
  price: number;

  tongTienHang: number = 0
  giamGia: number = 0;
  tienKhachCanTra: number = 0
  tienKhachDua: number = 0;
  tienThuaTraKhach: number = 0;

  formGroup: FormGroup;
  formGroupCustomer: FormGroup = this.fb.group({
    customer: 195
  })
  full_name: string;

  listCustomer: any[] = [];
  datetime = new Date();


  constructor(private productDetailService: ProductDetailsService,
              private customerService: CustomerService,
              private promotionDetailService: ProductPromotionalService,
              private fb: FormBuilder,
              private orderService: OrderService,
              private orderDetailService: OrderDetailService,
              private matDiaLog: MatDialog,
              private toastService: ToastrService,
              private storageService: StorageService) {
    this.full_name = this.storageService.getFullNameFromToken();
  }

  ngOnInit(): void {
    this.setDataOrder();
    this.selectedTab = this.tabs;
    this.initForm();
    this.getAllNameProduct();
    this.getCustomerForCombobox();
    this.getOrderByStaff(this.storageService.getIdFromToken());
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

  defaultPayment() {
    this.giamGia = 0;
    this.tongTienHang = 0;
    this.tienKhachCanTra = 0;
    this.tienKhachDua = 0;
    this.tienThuaTraKhach = 0;
  }

  removeTab(index: number) {
    this.createOrder = {
      id: this.idOrder,
      customer: {
        id: 195
      },
      staff: {
        id: this.storageService.getIdFromToken()
      },
      shipAddress: 'Tai quay',
      createDate: new Date(),
      paymentType: 0,
      status: 4,
      total: this.tongTienHang,
      discount: this.giamGia,
      totalPayment: this.tienKhachCanTra,
    }

    const diaLogRef = this.matDiaLog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: 'Xóa hóa đơn',
        message: 'Bạn có muốn hủy hóa đơn không ?',
      }
    });
    diaLogRef.afterClosed().subscribe((data: any) => {
      if (data == this.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.tabs.splice(index, 1);
        this.toastService.success('Hủy hóa đơn thành công !');

        this.defaultPayment();

        this.orderService.update(this.idOrder, this.createOrder).subscribe((data: any) => {
          console.log('Sau khi sua: ', data);
          this.toastService.success('Hủy hóa đơn thanh công !');
        }, error => {
          this.toastService.error('Hủy hóa đơn thất bại !');
          console.log(error);
        })
      }
    }, error => {
      this.toastService.warning('Hủy hóa đơn thất bại !')
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
            this.orderDetailService.saveOrderDetail(this.createProductAtOrderDetail(idProduct, this.idOrder, 1, data.price)).subscribe((data2: any) => {
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

  deleteOrderDetail(idProduct: number) {
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
        this.orderDetailService.delete(idProduct);
        this.orderDetailService.isReLoading.subscribe(data => {
          if (data) {
            this.getOrderDetail();
            this.orderDetailService.isReLoading.next(false);
          }
        })
      }
    })
  }

  updateOrderDetail(type: any, data: any, event?: any) {
    let soLuong = event?.target.value;

    if (soLuong > data.productDetail.quantity) {
      this.toastService.warning('Trong kho còn ' + data.productDetail.quantity + ' sản phẩm');
      event.target.value = data.quantity;
      return;
    }

    this.createProductAtOrderDetail(data.productDetail.id, this.idOrder, parseInt(soLuong), data.price);
    this.orderDetailService.updateQuantityOrderDetail(this.addProduct);
    this.orderDetailService.isReLoading.subscribe(data => {
      if (data) {
        this.getOrderDetail();
        this.orderDetailService.isReLoading.next(false);
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

  createProductAtOrderDetail(idProduct: number, idOrder: number, quantity: number, price: number) {
    this.addProduct = {
      productDetail: {
        id: idProduct
      },
      order: {
        id: idOrder
      },
      quantity: quantity,
      price: price
    };
    return this.addProduct;
  }

  getOrderDetailByOrder(name: number) {
    let id = this.idHoaDon.filter(n => n.name == name)[0].value;
    this.orderDetailService.findOrderDetailByOrder(id).subscribe((data: any) => {
      this.orderDetails = data;
    })
  }

  getOrderByStaff(id: number) {
    this.orderService.getOrderByStaff(id).subscribe((data: any) => {
      console.log(data);
    })
  }

  getOrderDetail() {
    this.orderDetailService.findOrderDetailByOrder(this.idOrder).subscribe((data: any) => {
      this.tongTienHang = 0;
      this.orderDetails = data;
      for (const d of data) {
        this.tongTienHang += Math.round(d.price * d.quantity);
      }
      this.promotionDetailService.getPromotional(this.idOrder).subscribe((data2: any) => {
        for (const pp of data2) {
          this.giamGia += pp.promotional.discount;
        }
        this.tienKhachCanTra = Math.round(this.tongTienHang - this.giamGia);
        if (this.tienKhachCanTra < 0) {
          this.tienKhachCanTra = 0;
        }
      })
    })
  }

  payment() {
    this.createOrder = {
      id: this.idOrder,
      customer: {
        id: 195
      },
      staff: {
        id: this.storageService.getIdFromToken()
      },
      shipAddress: 'Tai quay',
      createDate: new Date(),
      paymentType: 0,
      status: 3,
      total: this.tongTienHang,
      discount: this.giamGia,
      totalPayment: this.tienKhachCanTra,
    }

    const diaLogRef = this.matDiaLog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: 'Thanh toán',
        message: 'Bạn có muốn thanh toán hóa đơn này không ?',
      }
    });
    diaLogRef.afterClosed().subscribe((data: any) => {
      if (data == this.RESULT_CLOSE_DIALOG.CONFIRM) {
        if (this.tabs.length == 0) {
          this.toastService.warning('Vui lòng tạo hóa đơn để tiến hành thanh toán !');
        } else {
          this.orderService.update(this.idOrder, this.createOrder).subscribe((data: any) => {
            console.log('Sau khi sua: ', data);
            this.toastService.success('Thanh toán thành công !');
            this.defaultPayment();
          }, error => {
            this.toastService.error('Thanh toán thất bại !');
            console.log(error);
          })
        }
      }
    })
  }
}
