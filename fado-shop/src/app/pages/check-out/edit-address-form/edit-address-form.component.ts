import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AddressService} from "../../../shared/service/api-service-impl/address.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Contants} from "../../../shared/Contants";
import {ToastrService} from "ngx-toastr";
import {checkSpace} from "../../../shared/validator/validate";
import {StorageService} from "../../../shared/service/jwt/storage.service";

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
    province: ['', [Validators.required]],
    district: ['', [Validators.required]],
    commune: ['', [Validators.required]],
    other: ['', [checkSpace]],
    defaultAddress: [0],
  })

  RESULT_CLOSE_DIALOG = Contants.RESULT_CLOSE_DIALOG;
  TYPE_DIALOG = Contants.TYPE_DIALOG;
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  title: any;

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

  // lưu địa chỉ
  saveAddress() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    // nếu lúc thêm mà set điạ chỉ mặc định thì sẽ tìm ra địa chỉ măc định hiện tại rồi tắt mặc định đi sau đó thêm mới
    if (this.formGroup.getRawValue().defaultAddress == 1) {
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
