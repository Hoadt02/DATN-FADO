import {Component, Inject, OnInit} from '@angular/core';
import {CartService} from "../../shared/service/api-service-impl/cart.service";
import {CustomerService} from "../../shared/service/api-service-impl/customer.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as process from "process";
import {AddressService} from "../../shared/service/api-service-impl/address.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import * as events from "events";
import {EditAddressComponent} from "./edit-address/edit-address.component";
import {OrderService} from "../../shared/service/api-service-impl/order.service";
import {ToastrService} from "ngx-toastr";
import {OrderDetailService} from "../../shared/service/api-service-impl/orderDetail.service";
import {Contants} from "../../shared/Contants";
import {checkSpace, formatDate} from "../../shared/validator/validate";
import {Regex} from "../../shared/validator/regex";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  RESULT_CLOSE_DIALOG = Contants.RESULT_CLOSE_DIALOG;

  subtotal: number = 0;
  total: number = 0;
  discount: any = 0;
  items: any;
  customer: any;
  addressDefault: any;
  idAddress: any;
  // firstAddress: any;
  disableSelect = true;
  provinces!: any[];
  districts!: any[];
  wards!: any[];
  formGroup = this.fb.group({
    id: [null],
    province: ['', [Validators.required]],
    district: ['', [Validators.required]],
    ward: ['', [Validators.required]],
    other: ['', [checkSpace]],
    fullname: ['', [checkSpace, Validators.pattern(Regex.name)]],
    phoneNumber: ['', [checkSpace, Validators.pattern(Regex.phoneNumber)]],
  });

  dataCraeteOrderDetail: any;
  dataCreateOrder: any;

  constructor(
    private apiCustomer: CustomerService,
    private apiCart: CartService,
    private apiOrder: OrderService,
    private apiOrderDetail: OrderDetailService,
    private fb: FormBuilder,
    private apiAddress: AddressService,
    private matDiaLog: MatDialog,
    private toastrService: ToastrService,
    private matDialogRef: MatDialogRef<CheckOutComponent>,
    @Inject(MAT_DIALOG_DATA) private matDiaLogData: any,
  ) {
  }

  ngOnInit(): void {
    this.getAllPrdInCart();
    this.findById();
    this.findByCustomerIdAndDefaultAddress();
    this.getProvinces();
  }

  findById() {
    this.apiCustomer.findById(164).subscribe(data => {
      this.customer = data;
    })
  }

  // findAddressByCustomerId() {
  //   this.apiAddress.findByCustomerId(164).subscribe({
  //     next: (data: any) => {
  //       this.address = data as any;
  //       this.firstAddress = this.address[0];
  //       console.log(this.address);
  //     }, error: err => {
  //       console.log("loi get addresss: ", err);
  //     }
  //   })
  // }

  findByCustomerIdAndDefaultAddress() {
    this.apiAddress.findByCustomerIdAndDefaultAddress(164).subscribe({
      next: (data: any) => {
        this.addressDefault = data;
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

  getProvinces() {
    this.apiAddress.getProvinces().subscribe({
      next: (data) => {
        this.provinces = data as any[];
        this.districts = [];
        this.wards = [];
      },
    });
  }

  getDistricts(code: any) {
    this.apiAddress.getDistricts(code).subscribe({
      next: (data: any) => {
        this.districts = data.districts as any[];
        this.wards = [];
      },
    });
  }

  getWards(code: any) {
    this.apiAddress.getWards(code).subscribe({
      next: (data: any) => {
        this.wards = data.wards as any[];
      },
    });
  }

  // mở lên form chọn địa chỉ
  editAddress() {
    let idAddressSelect = this.addressDefault.id;
    this.matDiaLog.open(EditAddressComponent, {
      width: '1000px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        idAddressSelect
      }
    }).afterClosed().subscribe(data => {
      if (data != null) {
        this.idAddress = data;
        this.addressFindById();
      }
    })
  }

  //tìm kiếm đi chỉ dựa theo id được trả ra lúc chọn khi đóng form
  addressFindById() {
    this.apiAddress.findById(this.idAddress).subscribe(data => {
      this.addressDefault = data;
    })
  }

  onClose() {
    this.matDialogRef.close();
  }

  order() {
    let address = [];
    let fullname;
    let phoneNumber;
    if (this.disableSelect) {
      address.push(this.addressDefault.other, this.addressDefault.commune
        , this.addressDefault.district, this.addressDefault.province);
      fullname = this.addressDefault.customer.firstname + ' ' + this.addressDefault.customer.lastname;
      phoneNumber = this.addressDefault.customer.phoneNumber;
    } else {
      if (this.formGroup.invalid) {
        this.toastrService.warning('Vui lòng nhập đầy đủ thông tin giao hàng mới!');
        return;
      }
      address.push(this.formGroup.getRawValue().other, this.formGroup.getRawValue().ward
        , this.formGroup.getRawValue().district, this.formGroup.getRawValue().province);
      fullname = this.formGroup.getRawValue().fullname;
      phoneNumber = this.formGroup.getRawValue().phoneNumber;
    }

    this.dataCreateOrder = {
      customer: {
        id: 164
      },
      staff: {
        id: 34
      },
      shipAddress: address.join(' - ').replace(/^\s+|\s+$|\s+(?=\s)/g, ""),
      createDate: formatDate(new Date()),
      paymentType: 0,
      status: 0,
      total: this.subtotal,
      discount: this.discount,
      totalPayment: this.total,
      fullname: fullname!.replace(/^\s+|\s+$|\s+(?=\s)/g, ""),
      phoneNumber,
    }

    this.apiOrder.save(this.dataCreateOrder).subscribe({
      next: (data: any) => {
        console.log('order: ', data);
        this.dataCraeteOrderDetail = {
          orderId: data.id,
          cartList: this.items,
        }

        this.apiOrderDetail.save(this.dataCraeteOrderDetail).subscribe(() => {
          this.dataCreateOrder = [];

          this.apiCart.deleteByCustomer(164).subscribe(() => {
            this.toastrService.success('Đặt hàng thành công!');
            this.matDialogRef.close(this.RESULT_CLOSE_DIALOG.CONFIRM);
          });
        });
      }, error: (err: any) => {
        console.log(err);
        this.toastrService.error('Đặt hàng thất bại!');
      }
    });
  }
}
