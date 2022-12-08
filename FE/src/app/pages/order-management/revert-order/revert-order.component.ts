import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../shared/Constants";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-revert-order',
  templateUrl: './revert-order.component.html',
  styleUrls: ['./revert-order.component.scss']
})
export class RevertOrderComponent implements OnInit {

  descriptionOrder = null;

  constructor(
    public dialogRef: MatDialogRef<RevertOrderComponent>,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public dataDialog?: any,
  ) {
  }

  ngOnInit(): void {
  }

  onDismiss(): void {
    this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE);
  }

  onConfirm(): void {
    if (this.descriptionOrder === null){
      this.toastrService.warning('Vui lòng nhập lý do !');
      return;
    }
    this.dialogRef.close(this.descriptionOrder);
  }

}
