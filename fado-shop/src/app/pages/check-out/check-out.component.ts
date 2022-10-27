import {Component, Inject, OnInit} from '@angular/core';
import {CartService} from "../../shared/service/api-service-impl/cart.service";
import {CustomerService} from "../../shared/service/api-service-impl/customer.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import * as process from "process";
import {AddressService} from "../../shared/service/api-service-impl/address.service";
import {FormBuilder, FormControl} from "@angular/forms";
import * as events from "events";
import {EditAddressComponent} from "./edit-address/edit-address.component";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  subtotal: number = 0;
  total: number = 0;
  discount: any = 0;
  items: any;
  customer: any;
  address: any;
  idAddress: any;
  firstAddress: any;
  disableSelect = false;
  provinces!: any[];
  districts!: any[];
  wards!: any[];
  formGroup = this.fb.group({
    id: [],
    province: [],
    district: [],
    ward: [],
  });

  constructor(
    private apiCustomer: CustomerService,
    private apiCart: CartService,
    private fb: FormBuilder,
    private apiAddress: AddressService,
    private matDiaLog: MatDialog,
    private matDialogRef: MatDialogRef<CheckOutComponent>,
    @Inject(MAT_DIALOG_DATA) private matDiaLogData: any,
  ) {
  }

  ngOnInit(): void {
    this.getAllPrdInCart();
    this.findById();
    this.findAddressByCustomerId();
    this.getProvinces();
  }

  findById() {
    this.apiCustomer.findById(164).subscribe(data => {
      this.customer = data;
      console.log('customer: ', data);
    })
  }

  findAddressByCustomerId() {
    this.apiAddress.findByCustomerId(164).subscribe({
      next: (data: any) => {
        this.address = data as any;
        this.firstAddress = this.address[0];
        console.log(this.address);
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
    // const cccc = code?.target.value;
    console.log(code);
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

  editAddress() {
    let idAddressSelect = this.firstAddress.id;
    this.matDiaLog.open(EditAddressComponent, {
      width: '800px',
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


  addressFindById() {
    this.apiAddress.findById(this.idAddress).subscribe(data => {
      this.firstAddress = data;
    })
  }

  onClose() {
    this.matDialogRef.close();
  }

}
