import {Component, OnInit, ViewChild} from '@angular/core';

import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StaffService} from "../../../shared/services/api-service-impl/staff.service";
import {MatDialog} from "@angular/material/dialog";
import {StaffFormComponent} from "../staff-form/staff-form.component";
import {Constants} from "../../../shared/Constants";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  isLoading: boolean = true;
  TYPE_DIALOG = Constants.TYPE_DIALOG;
  loading = true;

  displayedColumns: string[] =
    [
      'id', 'firstname', 'lastname',
      'dateOfBirth', 'image', 'username',
      'email', 'phoneNumber', 'gender',
      'address', 'status', 'role', 'action'
    ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiStaff: StaffService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.apiStaff.getAll().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      }, error: (err => {
        console.log(err);
      })
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSave(type: any, row?: any) {
    const diaLogRef = this.matDialog.open(StaffFormComponent, {
      width: '1000px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        type, row
      }
    });
    diaLogRef.afterClosed().subscribe(rs => {
      if (rs == Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
        this.getAll();
      }
    })
  }

  openDelete(id) {
    const diaLogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: 'Xoá nhân viên',
        message: 'Bạn muốn xoá nhân viên này?'
      }
    });
    diaLogRef.afterClosed().subscribe(rs => {
      if (rs == Constants.RESULT_CLOSE_DIALOG.CONFIRM) {

      }
    })
  }
}
