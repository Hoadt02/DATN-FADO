import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Constants} from '../../../shared/Constants';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CustomerFormComponent} from '../customer-form/customer-form.component';
import {CustomerService} from '../../../shared/services/api-service-impl/customer.service';
import {ConfirmDialogComponent} from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  TYPE_DIALOG = Constants.TYPE_DIALOG;
  RESULT_CLOSE_DIALOG = Constants.RESULT_CLOSE_DIALOG;
  isLoading = true;
  title: string
  message: string
  displayedColumns: string[] = ['index', 'image', 'firstname', 'lastname', 'username', 'password', 'email', 'dateOfBirth', 'phoneNumber', 'gender', 'status', 'thaoTac'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAll();
  }

  constructor(
    private matDialog: MatDialog,
    private customerService: CustomerService) {
  }

  getAll() {
    this.customerService.getAll().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  applyFilter(event: Event
  ) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

// openDiaLog(type: string, row?: any) {
//   this.dialogService.open(CustomerFormComponent,
//     {
//       width: '900px',
//       data: {type, row}
//     }).afterClosed().subscribe(result => {
//     if (result === Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
//       this.getAll();
//     };
//   });
// }

  openSave(type: any, row?: any
  ) {
    const dialogRef = this.matDialog.open(CustomerFormComponent, {
      width: '800px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        type, row
      }
    });
    dialogRef.afterClosed().subscribe(rs => {
      // tslint:disable-next-line:triple-equals
      if (rs == Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
        this.getAll();
      }
    })
  }

  active(type: any, row: any
  ) {
    // tslint:disable-next-line:triple-equals
    if (type == this.RESULT_CLOSE_DIALOG.ACTIVE) {
      this.title = 'Kích hoạt khách hàng';
      this.message = 'Bạn có chắc chắn muốn kích hoạt khách hàng này?'
    } else {
      this.title = 'Vô hiệu hoá khách hang!';
      this.message = 'Bạn có chắc chắn muốn vô hiệu hoá khách hàng này?'
    }

    const diaLogRef = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: this.title,
        message: this.message,
      }
    });
    diaLogRef.afterClosed().subscribe(rs => {
      // tslint:disable-next-line:triple-equals
      if (rs == Constants.RESULT_CLOSE_DIALOG.CONFIRM) {
        // tslint:disable-next-line:triple-equals
        if (type == this.RESULT_CLOSE_DIALOG.ACTIVE) {
          row.status = 1;
          this.customerService.update(row.id, row);
        } else {
          row.status = 0;
          this.customerService.update(row.id, row);
        }
      }
    })
  }
}
