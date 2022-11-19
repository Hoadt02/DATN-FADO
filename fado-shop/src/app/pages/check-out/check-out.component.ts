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
import {Router} from "@angular/router";
import {StorageService} from "../../shared/service/jwt/storage.service";

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
  totalFeeShipping: number = 0;
  disableSelect = true;
  provinces!: any[];
  districts!: any[];
  wards!: any[];

  districtId: any;

  districtName!: string;
  provinceName!: string;
  wardName!: string;

  formGroup = this.fb.group({
    id: [null],
    province: ['', [Validators.required]],
    district: ['', [Validators.required]],
    ward: ['', [Validators.required]],
    other: ['', [checkSpace, Validators.maxLength(100)]],
    fullname: ['', [checkSpace, Validators.maxLength(60), Validators.pattern(Regex.name)]],
    phoneNumber: ['', [checkSpace, Validators.pattern(Regex.phoneNumber)]],
  });

  dataCraeteOrderDetail: any;

  dataCreateOrder: any;

  constructor(
    private apiCustomer: CustomerService,
    private apiCart: CartService,
    private apiOrder: OrderService,
    private storageService: StorageService,
    private apiOrderDetail: OrderDetailService,
    private fb: FormBuilder,
    private apiAddress: AddressService,
    private matDiaLog: MatDialog,
    private toastrService: ToastrService,
    private matDialogRef: MatDialogRef<CheckOutComponent>,
    @Inject(MAT_DIALOG_DATA) private matDiaLogData: any,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAllPrdInCart();
    this.findById();
    this.findByCustomerIdAndDefaultAddress();
    this.getProvinces();
    this.formGroup.disable();
  }

  findById() {
    this.apiCustomer.findById(this.storageService.getIdFromToken()).subscribe(data => {
      this.customer = data;
    })
  }

  getFeeShipping() {
    console.log('Địa chỉ: ', this.addressDefault);
    let service_id;
    const infoService = {
      shop_id: 1034510,
      from_district: 1734, // từ quận nào yên lạc vĩnh phúc
      to_district: this.districtId // đến quận nào
    }

    this.apiAddress.getInfoService(infoService).subscribe((data: any) => {
      service_id = data.data[0].service_id
    })
    const feeShipping = {
      service_id: service_id, // data trả về t bên trên
      service_type_id: 2, // đường bộ
      insurance_value: this.subtotal, // tổng tiền đơn hàng
      // coupon: null, // giảm giá của nhà vận chuyển
      from_district_id: 1766, // gửi từ quận nào
      to_district_id: this.districtId, // đến quận nào
      // to_ward_code: wardId,// xã nào
      weight: 200 // trọng lượng đơn hàng
    }
    this.apiAddress.feeShipping(feeShipping).subscribe((data: any) => {
      this.totalFeeShipping = 0;
      this.totalFeeShipping = data.data.total
      console.log("Phí vận chuyển: ", this.totalFeeShipping);
    })
  }

  findByCustomerIdAndDefaultAddress() {
    this.apiAddress.findByCustomerIdAndDefaultAddress(this.storageService.getIdFromToken()).subscribe({
      next: (data: any) => {
        this.addressDefault = data;
        this.idAddress = data.id;
        this.districtId = data.districtId;
        this.getFeeShipping();
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
      this.subtotal += (x.price * x.quantity);
    }
    this.total = this.subtotal - this.discount;
    if (this.total < 0) {
      this.total = 0;
    }
  }

  getProvinces() {
    this.apiAddress.getProvinces().subscribe({
      next: (data: any) => {
        this.provinces = data.data;
        this.districts = [];
        this.wards = [];
      },
    });
  }

  resetDistrictAndWard() {
    this.formGroup.patchValue({district: ''});
    this.formGroup.patchValue({ward: ''});
  }

  getDistricts(id: any, name: string) {
    this.provinceName = name
    this.apiAddress.getDistricts(id).subscribe({
      next: (data: any) => {
        this.districts = data.data;
        this.wards = [];
      },
    });
  }

  getWards(id: any, name: string) {
    this.districtId = id;
    this.districtName = name;
    this.apiAddress.getWards(id).subscribe({
      next: (data: any) => {
        this.wards = data.data;
      },
    });
  }

  getWardsName(code: any, name: any) {
    this.wardName = name;
    this.getFeeShipping();
  }

  resetWard() {
    this.formGroup.patchValue({ward: ''});
  }

  // mở lên form chọn địa chỉ
  editAddress() {
    let idAddressSelect;
    if (this.addressDefault) {
      idAddressSelect = this.addressDefault.id;
    }
    this.matDiaLog.open(EditAddressComponent, {
      width: '1000px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        idAddressSelect
      }
    }).afterClosed().subscribe(data => {
      if (null != data && 0 != data) {
        this.idAddress = data;
        this.addressFindById();
      }
    })
  }

  //tìm kiếm đi chỉ dựa theo id được trả ra lúc chọn khi đóng form
  addressFindById() {
    this.apiAddress.findById(this.idAddress).subscribe((data: any) => {
      this.districtId = data.districtId;
      this.addressDefault = data;
      this.getFeeShipping();
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
      address.push(this.addressDefault.other, this.addressDefault.ward
        , this.addressDefault.district, this.addressDefault.province);
      fullname = this.addressDefault.fullname;
      phoneNumber = this.addressDefault.phoneNumber;
    } else {
      if (this.formGroup.invalid) {
        this.toastrService.warning('Vui lòng nhập đầy đủ thông tin giao hàng mới!');
        this.formGroup.markAllAsTouched();
        return;
      }
      address.push(this.formGroup.getRawValue().other, this.wardName, this.districtName, this.provinceName);
      fullname = this.formGroup.getRawValue().fullname;
      phoneNumber = this.formGroup.getRawValue().phoneNumber;
    }

    this.dataCreateOrder = {
      customer: {
        id: this.storageService.getIdFromToken()
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
      feeShipping: this.totalFeeShipping,
      totalPayment: this.total + this.totalFeeShipping,
      fullname: fullname!.replace(/^\s+|\s+$|\s+(?=\s)/g, ""),
      phoneNumber,
      type : 0,
    }

    this.apiOrder.save(this.dataCreateOrder).subscribe({
      next: (data: any) => {
        this.dataCraeteOrderDetail = {
          orderId: data.id,
          cartList: this.items,
        }

        this.apiOrderDetail.save(this.dataCraeteOrderDetail).subscribe(() => {
          this.dataCreateOrder = [];

          this.apiCart.deleteByCustomer(this.storageService.getIdFromToken()).subscribe(() => {
            this.toastrService.success('Đặt hàng thành công!');
            this.matDialogRef.close(this.RESULT_CLOSE_DIALOG.CONFIRM);
            this.router.navigate(['/order-history']);
          });
        });
      }, error: (err: any) => {
        console.log(err);
        this.toastrService.error('Đặt hàng thất bại!');
      }
    });
  }

  checkAddress() {
    if (this.disableSelect) {
      this.totalFeeShipping = 0;
      this.addressFindById();
      this.formGroup.disable();
      this.formGroup.patchValue({
        province: '',
        district: '',
        ward: '',
        other: '',
        fullname: '',
        phoneNumber: '',
      })
    } else {
      this.totalFeeShipping = 0;
      this.formGroup.enable();
    }
  }
}
