import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Constants} from '../../../shared/Constants';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {CategoryFormComponent} from '../category-form/category-form.component';
import {CategoryService} from '../../../shared/services/api-service-impl/category.service';
import {ConfirmDialogComponent} from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class CategoryListComponent implements OnInit {

  readonly TYPE_DIALOG = Constants.TYPE_DIALOG;
  isLoading: boolean = true;
  displayedColumns: string[] = ['index', 'image', 'name', 'status', 'thaoTac'];
  dataSource!: MatTableDataSource<any>;
  RESULT_CLOSE_DIALOG = Constants.RESULT_CLOSE_DIALOG;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private title: string;
  private message: string;


  ngOnInit(): void {
    this.getAll();
  }

  constructor(private fb: FormBuilder,
              private dialogService: MatDialog,
              private toastService: ToastrService,
              private categoryService: CategoryService,
              private matDialog: MatDialog) {
  }

  getAll() {
    this.categoryService.getAll().subscribe({
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
    this.dialogService.open(CategoryFormComponent,
      {
        width: '500px',
        data: {type, row},
      }).afterClosed().subscribe(result => {
      if (result === Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
        this.getAll();
      };
    });
  }

  disableActive(type: any, row: any) {
    if (type == this.RESULT_CLOSE_DIALOG.ACTIVE) {
      this.title = 'Mở kinh doanh';
      this.message = 'Mở kinh doanh cho danh mục này ?'
    } else {
      this.title = 'Ngừng kinh doanh';
      this.message = 'Ngừng kinh doanh cho danh mục này ?'
    }

    const dialog = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: this.title,
        message: this.message,
      }
    });
    dialog.afterClosed().subscribe(rs => {
      if (rs == Constants.RESULT_CLOSE_DIALOG.CONFIRM) {
        if (type == this.RESULT_CLOSE_DIALOG.ACTIVE) {
          row.status = 1;
          this.categoryService.updateActive(row).subscribe({
            next: (data) => {
              console.log(data);
              this.toastService.success('Đã chuyển thành kinh doanh')
            },
            error: (error) => {
              console.log(error);
              this.toastService.success('Lỗi !!!')
            }
          });
        } else {
          row.status = 0;
          this.categoryService.updateActive(row).subscribe({
            next: (data) => {
              console.log(data);
              this.toastService.success('Đã chuyển thành ngừng kinh doanh')
            },
            error: (error) => {
              console.log(error);
              this.toastService.success('Lỗi !!!')
            }
          });
        }
      }
    })
  }
}
