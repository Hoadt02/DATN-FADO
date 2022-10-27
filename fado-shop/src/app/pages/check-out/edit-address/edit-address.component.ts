import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ApiAddressService} from "../../../shared/service/api-services/api-address.service";
import {AddressService} from "../../../shared/service/api-service-impl/address.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditAddressFormComponent} from "../edit-address-form/edit-address-form.component";

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  addressList: any;
  idAddress: number = 0;

  constructor(
    private apiAddress: AddressService,
    private matDiaLog: MatDialog,
    private matDiaLogRef: MatDialogRef<EditAddressComponent>,
  ) {
  }

  ngOnInit(): void {
    this.findAddressByCustomerId();
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

  openNewAddress() {
    this.matDiaLog.open(EditAddressFormComponent, {
      width: '100px',
    })
  }

  onClose() {
    this.matDiaLogRef.close();
  }

  getId(id: number) {
    this.idAddress = id;
  }
}
