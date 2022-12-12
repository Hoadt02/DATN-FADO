import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BarcodeScannerLivestreamComponent} from "ngx-barcode-scanner";
import {ProductDetailsService} from "../../../shared/services/api-service-impl/product-details.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-scanner-form',
  templateUrl: './scanner-form.component.html',
  styleUrls: ['./scanner-form.component.scss']
})
export class ScannerFormComponent implements OnInit, AfterViewInit {

  @ViewChild(BarcodeScannerLivestreamComponent) barcodeScanner: BarcodeScannerLivestreamComponent;

  barcodeValue: string;

  constructor(private productDetailsService: ProductDetailsService,
              private matDialogRef: MatDialogRef<ScannerFormComponent>,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.barcodeScanner.start();
  }

  onValueChange(result) {
    this.barcodeValue = result.codeResult.code;
    this.productDetailsService.getProductDetailByImei(this.barcodeValue).subscribe((data: any) => {
      this.matDialogRef.close(data);
    })
  }

  onStarted(started) {
    console.log(started);
  }

  close() {
    this.matDialogRef.close();
  }
}
