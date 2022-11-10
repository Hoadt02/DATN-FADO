import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AddressService} from "../../../shared/service/api-service-impl/address.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Contants} from "../../../shared/Contants";
import {ToastrService} from "ngx-toastr";
import {checkSpace} from "../../../shared/validator/validate";
import {StorageService} from "../../../shared/service/jwt/storage.service";
import {Regex} from "../../../shared/validator/regex";

@Component({
  selector: 'app-edit-address-form',
  templateUrl: './edit-address-form.component.html',
  styleUrls: ['./edit-address-form.component.css']
})
export class EditAddressFormComponent implements OnInit {

  formGroup = this.fb.group({
    id: [],
    customer: this.fb.group({
      id: [this.storageService.getIdFromToken()]
    }),
    province: [''],
    provinceId: ['', [Validators.required]],
    district: [''],
    districtId: ['', [Validators.required]],
    ward: [''],
    wardId: ['', [Validators.required]],
    other: ['', [checkSpace]],
    fullname: ['', [checkSpace]],
    phoneNumber: ['', []], //checkSpace, Regex.phoneNumber
    defaultAddress: [0],
  })

  RESULT_CLOSE_DIALOG = Contants.RESULT_CLOSE_DIALOG;
  TYPE_DIALOG = Contants.TYPE_DIALOG;
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  title: any;

  districtName!: string;
  provinceName!: string;
  wardName!: string;

  constructor(
    private fb: FormBuilder,
    private apiAddress: AddressService,
    private storageService: StorageService,
    private matDialogRef: MatDialogRef<EditAddressFormComponent>,
    @Inject(MAT_DIALOG_DATA) private matDiaLogData: any,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getProvinces();
    if (this.matDiaLogData.type == this.TYPE_DIALOG.NEW) {
      this.title = 'Thêm mới địa chỉ.';
    } else {
      this.formGroup.patchValue(this.matDiaLogData.row);
      this.title = 'Cập nhật địa chỉ.'
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
    this.districtName = name;
    this.apiAddress.getWards(id).subscribe({
      next: (data: any) => {
        this.wards = data.data;
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
    this.formGroup.patchValue({province: this.provinceName, district: this.districtName, ward: this.wardName})
    console.log(this.formGroup.getRawValue());

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    // nếu lúc thêm mà set điạ chỉ mặc định thì sẽ tìm ra địa chỉ măc định hiện tại rồi tắt mặc định đi sau đó thêm mới
    if (1 == this.formGroup.getRawValue().defaultAddress) {
      this.apiAddress.findByCustomerIdAndDefaultAddress(this.storageService.getIdFromToken()).subscribe((data: any) => {
        data.defaultAddress = 0;
        this.apiAddress.save(data).subscribe({
          next: () => {
          }, error: err => {
            console.log('Có lỗi cập nhật địa chỉ: ', err);
          }
        });
      })
    }

    this.apiAddress.save(this.formGroup.getRawValue()).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Cập nhật địa chỉ thành công!');
        this.matDialogRef.close(this.RESULT_CLOSE_DIALOG.SUCCESS);
      }, error: err => {
        console.log('Có lỗi Cập nhật địa chỉ: ', err);
        this.toastrService.error('Cập nhật địa chỉ thất bại!');
      }
    });

  }

  onClose() {
    this.matDialogRef.close();
  }
}
