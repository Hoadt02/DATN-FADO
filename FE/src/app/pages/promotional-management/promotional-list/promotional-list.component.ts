import {Component, OnInit, ViewChild} from '@angular/core';
import {Constants} from "../../../shared/Constants";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {PromotionalService} from "../../../shared/services/api-service-impl/promotional.service";
import {PromotionalFormComponent} from "../promotional-form/promotional-form.component";
import {formatDate} from "../../../shared/format/formatData";

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
  filterStatus: any;
  filterType: any;
  filterStartDate: any;
  filterEndDate: any;
  listData: any[] = [];

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
    this.filterType = null;
    this.filterStatus = null;
    this.isLoading = true;
    this.apiPromotional.getAll().subscribe({
      next: (data: any) => {
        this.listData = data as any[];
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
        this.checkStatus();
      }, error: (err => {
        this.toastrService.error('Lỗi tải dữ liệu');
        console.log(err);
        this.isLoading = false;
        return;
      })
    })
  }

  getFilterDate() {
    this.filterType = null;
    this.filterStatus = null;
    this.isLoading = true;
    this.apiPromotional.getAll().subscribe({
      next: (data: any) => {
        data = data.filter(s => s.startDate >= formatDate(this.filterStartDate) && s.endDate <= formatDate(this.filterEndDate))
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

  getFilterStatus() {
    this.filterType = null;
    this.isLoading = true;
    this.apiPromotional.getAll().subscribe({
      next: (data: any) => {
        data = data.filter(m => m.status == this.filterStatus)
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

  getFilterType() {
    this.filterStatus = null;
    this.isLoading = true;
    this.apiPromotional.getAll().subscribe({
      next: (data: any) => {
        // data = data.filter(s => s.startDate < 123 && s.endDate)
        data = data.filter(m => m.type == this.filterType)
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
    console.log(this.filterType);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSave(type: any, row?: any) {
    const diaLogRef = this.matDialog.open(PromotionalFormComponent, {
      width: '600px',
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

  /**Xoá mềm*/
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
          this.isLoading = true;
          row.status = 1;
          this.apiPromotional.update(row.id, row);
        } else {
          this.isLoading = true;
          row.status = 0;
          this.apiPromotional.update(row.id, row);
        }
      }
      this.apiPromotional.isCloseDialog.subscribe((data) => {
        if (data) {
          this.apiPromotional.isCloseDialog.next(false);
          this.isLoading = false;
        }
      });
    })
  }

  checkStatus() {
    console.log(this.listData);
    for (const x of this.listData) {
      console.log(x);
      if (x.endDate < formatDate(new Date()) && x.status == 1) {
        this.isLoading = true;
        x.status = 0;
        this.apiPromotional.update(x.id, x);
      }
    }
    this.apiPromotional.isCloseDialog.subscribe(data => {
      if (data) {
        this.isLoading = false;
      }
    })
  }

}
