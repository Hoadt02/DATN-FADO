import {Component, Inject, OnInit} from '@angular/core';
import {StaffService} from "../../../shared/services/api-service-impl/staff.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {

  staff: any = {};

  constructor(
    private readonly staffService: StaffService,
    private matDataRef: MatDialogRef<StaffDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private dataDiaLog: any,
  ) {
  }

  ngOnInit(): void {
    if (this.dataDiaLog.row) {
      console.log('có data: ', this.dataDiaLog.row);
      this.staff = this.dataDiaLog.row;
    }
  }

  finById(id: number) {
    this.staffService.findById(id);
  }

  close() {
    this.matDataRef.close();
  }
}
