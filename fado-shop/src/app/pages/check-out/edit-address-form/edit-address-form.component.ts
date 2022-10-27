import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AddressService} from "../../../shared/service/api-service-impl/address.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Contants} from "../../../shared/Contants";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-address-form',
  templateUrl: './edit-address-form.component.html',
  styleUrls: ['./edit-address-form.component.css']
})
export class EditAddressFormComponent implements OnInit {

  formGroup = this.fb.group({
    id: [],
    customer: this.fb.group({
      id: [164]
    }),
    province: [],
    district: [],
    commune: [],
    other: [],
  })

  RESULT_CLOSE_DIALOG = Contants.RESULT_CLOSE_DIALOG;
  provinces!: any[];
  districts!: any[];
  wards!: any[];

  constructor(
    private fb: FormBuilder,
    private apiAddress: AddressService,
    private matDialogRef: MatDialogRef<EditAddressFormComponent>,
    @Inject(MAT_DIALOG_DATA) private matDiaLogData: any,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getProvinces();
    if (this.matDiaLogData.row) {
      this.formGroup.patchValue(this.matDiaLogData.row);
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

  saveAddress() {
    this.apiAddress.create(this.formGroup.getRawValue()).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Thêm địa chỉ thành công!');
        this.matDialogRef.close(this.RESULT_CLOSE_DIALOG.SUCCESS);
      }, error: err => {
        console.log('Có lỗi thêm địa chỉ: ', err);
        this.toastrService.error('Thêm địa chỉ thất bại!');
      }
    });
  }

  onClose() {
    this.matDialogRef.close();
  }
}