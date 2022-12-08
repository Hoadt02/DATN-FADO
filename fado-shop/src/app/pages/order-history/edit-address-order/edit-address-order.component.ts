import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {checkSpace} from "../../../shared/validator/validate";
import {Regex} from "../../../shared/validator/regex";
import {Contants} from "../../../shared/Contants";
import {AddressService} from "../../../shared/service/api-service-impl/address.service";
import {StorageService} from "../../../shared/service/jwt/storage.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-address-order',
  templateUrl: './edit-address-order.component.html',
  styleUrls: ['./edit-address-order.component.css']
})
export class EditAddressOrderComponent implements OnInit {

  formGroup = this.fb.group({
    province: [''],
    provinceId: ['', [Validators.required]],
    district: [''],
    districtId: ['', [Validators.required]],
    ward: [''],
    wardId: ['', [Validators.required]],
    other: ['', [checkSpace, Validators.maxLength(100)]],
    fullname: ['', [checkSpace, Validators.maxLength(60), Validators.pattern(Regex.name)]],
    phoneNumber: ['', [checkSpace, Validators.pattern(Regex.phoneNumber)]], //checkSpace, Regex.phoneNumber
  })

  RESULT_CLOSE_DIALOG = Contants.RESULT_CLOSE_DIALOG;
  TYPE_DIALOG = Contants.TYPE_DIALOG;
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  districtName!: string;
  provinceName!: string;
  wardName!: string;

  dataChange: any;
  districtId: any;
  totalPayment: any;
  feeship = 0;

  constructor(
    private fb: FormBuilder,
    private apiAddress: AddressService,
    private storageService: StorageService,
    private matDialogRef: MatDialogRef<EditAddressOrderComponent>,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private matDiaLogData: any,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getProvinces();
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
    this.formGroup.patchValue({districtId: ''});
    this.formGroup.patchValue({wardId: ''});
  }

  getDistricts(id: any, name: string) {
    console.log(name);
    this.provinceName = name
    this.apiAddress.getDistricts(id).subscribe({
      next: (data: any) => {
        this.districts = data.data;
        this.wards = [];
      },
    });
  }

  getWards(id: any, name: string) {
    console.log(name);
    this.districtId = id;
    this.districtName = name;
    this.apiAddress.getWards(id).subscribe({
      next: (data: any) => {
        this.wards = data.data;
        this.getFeeShipping();
      },
    });
  }

  getWardsName(name: any) {
    console.log(name)
    this.wardName = name;
  }

  resetWard() {
    this.formGroup.patchValue({wardId: ''});
  }

  // lưu địa chỉ
  saveAddress() {
    let address = [];
    let fullname;
    let phoneNumber;
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }
    address.push(this.formGroup.getRawValue().other, this.wardName, this.districtName, this.provinceName);
    fullname = this.formGroup.getRawValue().fullname;
    phoneNumber = this.formGroup.getRawValue().phoneNumber;
    this.dataChange = {
      shipAddress: address.join(' - ').replace(/^\s+|\s+$|\s+(?=\s)/g, ""),
      feeShipping: this.feeship,
      fullname,
      phoneNumber,
      totalPayment: this.totalPayment
    }
    this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
      hasBackdrop: true,
      disableClose: true,
      data: {
        title: 'Thay đổi thông tin giao hàng',
        message: 'Bạn chắc chắn muốn thay đổi thông tin giao hàng ?'
      }
    }).afterClosed().subscribe(data => {
      if (data == Contants.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.matDialogRef.close(this.dataChange);
      }
    })
  }

  getFeeShipping() {
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
      insurance_value: this.matDiaLogData.totalPayment, // tổng tiền đơn hàng
      from_district_id: 1766, // gửi từ quận nào
      to_district_id: this.districtId, // đến quận nào
      weight: 200 // trọng lượng đơn hàng
    }
    this.apiAddress.feeShipping(feeShipping).subscribe((data: any) => {
      console.log('Phí ship nè: ', data.data.total);
      this.feeship = data.data.total;
      this.totalPayment = this.matDiaLogData.totalPayment + this.feeship;
    })
  }

  onClose() {
    this.matDialogRef.close();
  }

}
