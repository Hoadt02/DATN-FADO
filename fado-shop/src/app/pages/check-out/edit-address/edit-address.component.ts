import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ApiAddressService} from "../../../shared/service/api-services/api-address.service";
import {AddressService} from "../../../shared/service/api-service-impl/address.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditAddressFormComponent} from "../edit-address-form/edit-address-form.component";
import * as Constants from "constants";
import {Contants} from "../../../shared/Contants";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  addressList: any;
  idAddress: number = 0;
  checkAddress: any;
  TYPE_DIALOG = Contants.TYPE_DIALOG;
  RESULT_CLOSE_DIALOG = Contants.RESULT_CLOSE_DIALOG;

  constructor(
    private apiAddress: AddressService,
    private matDiaLog: MatDialog,
    private matDiaLogRef: MatDialogRef<EditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) private matDiaLogData: any,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.findAddressByCustomerId();
    this.checkAddress = this.matDiaLogData.idAddressSelect;
  }

  findAddressByCustomerId() {
    this.apiAddress.findByCustomerId(164).subscribe({
      next: (data: any) => {
        this.addressList = data as any;
        console.log(data);
      }, error: err => {
        console.log("loi get addresss: ", err);
      }
    })
  }

  saveAddress() {
    this.matDiaLogRef.close(this.idAddress);
  }

  openNewAddress(type: any, row?: any) {
    this.matDiaLog.open(EditAddressFormComponent, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        type, row
      }
    }).afterClosed().subscribe(data => {
      if (data == this.RESULT_CLOSE_DIALOG.SUCCESS) {
        this.findAddressByCustomerId();
      }
    })
  }

  deleteAddress(id: number) {
    this.matDiaLog.open(ConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: 'Xoá địa chỉ!',
        message: 'Bạn có chắc chắn muốn xoá địa chỉ này?'
      }
    }).afterClosed().subscribe(data => {
      if (data == this.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.apiAddress.delete(id).subscribe(() => {
          this.toastrService.success('Xoá thành công!');
          this.findAddressByCustomerId();
        });
      }
    })
  }

  onClose() {
    this.matDiaLogRef.close();
  }

  getId(id: number) {
    this.idAddress = id;
  }
}
