import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-revert-detail',
  templateUrl: './revert-detail.component.html',
  styleUrls: ['./revert-detail.component.scss']
})
export class RevertDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RevertDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog?: any,
  ) {
  }

  reason: string;

  ngOnInit(): void {
    this.reason = this.dataDialog.message;
  }

  onDismiss() {
    this.dialogRef.close();
  }
}
