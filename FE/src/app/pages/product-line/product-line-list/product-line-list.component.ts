import {Component, OnInit, ViewChild} from '@angular/core';
import {Constants} from "../../../shared/Constants";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {ProductService} from "../../../shared/services/api-service-impl/product.service";
import {ProductLineFormComponent} from "../product-line-form/product-line-form.component";

@Component({
  selector: 'app-product-line-list',
  templateUrl: './product-line-list.component.html',
  styleUrls: ['./product-line-list.component.scss']
})
export class ProductLineListComponent implements OnInit {
  readonly TYPE_DIALOG = Constants.TYPE_DIALOG;

  displayedColumns: string[] = ['index', 'category' , 'name', 'createDate' , 'status' ,'thaoTac'];
  dataSource!: MatTableDataSource<any>;
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAll();
  }

  constructor(private fb: FormBuilder,
              private dialogService: MatDialog,
              private toastService: ToastrService,
              private productService: ProductService) {
  }

  getAll() {
    this.productService.getAll().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.toastService.warning('Lỗi load dữ liệu!');
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDiaLog(type: string, row?: any) {
    this.dialogService.open(ProductLineFormComponent,
      {
        width: '600px',
        data: {type, row}
      }).afterClosed().subscribe(result => {
      if (result === Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
        this.getAll();
      };
    });
  }

  onDelete(row: any) {
    this.dialogService.open(ConfirmDialogComponent,
      {
        width: '25vw',
        data: {
          message: 'Bạn có muốn xóa dòng sản phẩm này?'
        }
      }).afterClosed().subscribe(result => {
      if (result == Constants.RESULT_CLOSE_DIALOG.CONFIRM) {
        row.status = 0;
        this.productService.update(row).subscribe({
          next: () => {
            this.toastService.success('Xóa dòng sản phẩm thành công');
          }
        });
      }
    });
  }
}
