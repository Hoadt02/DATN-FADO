import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Constants} from "../../../shared/Constants";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {OriginFormComponent} from "../origin-form/origin-form.component";

@Component({
  selector: 'app-customer-list',
  templateUrl: './origin-list.component.html',
  styleUrls: ['./origin-list.component.scss']
})
export class OriginListComponent implements OnInit {

  readonly TYPE_DIALOG = Constants.TYPE_DIALOG;

  ngOnInit(): void {
    this.getAll();
  }

  displayedColumns: string[] = ['index','name', 'thaoTac'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder,
              private dialogService: MatDialog,
              private toastService: ToastrService) {
  }

  getAll() {
    // this.service.getAllNhaXuatBan().subscribe({
    //   next: (data: any) => {
    //     this.dataSource = new MatTableDataSource(data);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDiaLog(type: string, row?: any) {
    this.dialogService.open(OriginFormComponent,
      {
        width: "900px",
        data: {type, row}
      }).afterClosed().subscribe(result => {
      if (result === Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
        this.getAll();
      };
    });
  }

  openDelete(id: number) {
    // this.dialogService.open(ConfirmDialogComponent,
    //   {
    //     width: '25vw',
    //     data: {
    //       message: 'Bạn có muốn xóa bản ghi này?'
    //     }
    //   }).afterClosed().subscribe(result => {
    //   if (result === Constants.RESULT_CLOSE_DIALOG.CONFIRM) {
    //     this.service.deleteNhaXuatBan(id).subscribe({
    //       next: () => {
    //         this.getAll();
    //         this.toastService.success('XÓA THÀNH CÔNG!');
    //       },
    //       error: (error) => {
    //         console.log(error);
    //         this.toastService.error('XÓA THẤT BẠI!');
    //       }
    //     })
    //   }
    // });
  }
}
