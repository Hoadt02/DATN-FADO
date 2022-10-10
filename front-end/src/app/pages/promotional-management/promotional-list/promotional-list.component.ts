import {Component, OnInit, ViewChild} from '@angular/core';
import {Constants} from "../../../shared/Constants";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {StaffService} from "../../../shared/services/api-service-impl/staff.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {StaffFormComponent} from "../../staff-management/staff-form/staff-form.component";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {StaffDetailComponent} from "../../staff-management/staff-detail/staff-detail.component";
import {PromotionalService} from "../../../shared/services/api-service-impl/promotional.service";

@Component({
  selector: 'app-promotional-list',
  templateUrl: './promotional-list.component.html',
  styleUrls: ['./promotional-list.component.scss']
})
export class PromotionalListComponent implements OnInit {

  isLoading = true;
  TYPE_DIALOG = Constants.TYPE_DIALOG;
  RESULT_CLOSE_DIALOG = Constants.RESULT_CLOSE_DIALOG;
  loading = true;
  title: string;
  message: string;

  displayedColumns: string[] =
    [
      'stt', 'name', 'discount',
      'startDate', 'endDate', 'status',
      'staff', 'description', 'action'
    ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiPromotional: PromotionalService,
    private toastrService: ToastrService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.apiPromotional.getAll().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      }, error: (err => {
        this.toastrService.error('Lỗi tải dữ liệu');
        console.log(err);
        this.isLoading = false;
        return;
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
      width: '800px',
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

  active(type: any, row: any) {
    if (type == this.RESULT_CLOSE_DIALOG.ACTIVE) {
      this.title = 'Kích hoạt khuyến mại!';
      this.message = 'Bạn có chắc chắn muốn kích hoạt khuyến mại này?'
    } else {
      this.title = 'Vô hiệu hoá khuyến mại!';
      this.message = 'Bạn có chắc chắn muốn vô hiệu hoá khuyến mại này?'
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
      if (rs == Constants.RESULT_CLOSE_DIALOG.CONFIRM) {
        if (type == this.RESULT_CLOSE_DIALOG.ACTIVE) {
          row.status = 1;
          this.apiPromotional.update(row.id, row);
        } else {
          row.status = 0;
          this.apiPromotional.update(row.id, row);
        }
      }
    })
  }

  detail(row) {
    this.matDialog.open(StaffDetailComponent, {
      width: '700px',
      hasBackdrop: true,
      disableClose: true,
      data: {
        row
      }
    })
  }

}
