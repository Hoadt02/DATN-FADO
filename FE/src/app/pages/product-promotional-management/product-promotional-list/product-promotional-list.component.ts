import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductPromotionalService} from "../../../shared/services/api-service-impl/product-promotional.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProductPromotionalFormComponent} from "../product-promotional-form/product-promotional-form.component";
import {Constants} from "../../../shared/Constants";
import {ToastrService} from "ngx-toastr";
import {SelectionModel} from "@angular/cdk/collections";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-product-promotional-form-list',
  templateUrl: './product-promotional-list.component.html',
  styleUrls: ['./product-promotional-list.component.scss']
})
export class ProductPromotionalListComponent implements OnInit {

  isLoading = true;
  TYPE_DIALOG = Constants.TYPE_DIALOG;
  RESULT_CLOSE_DIALOG = Constants.RESULT_CLOSE_DIALOG;


  displayedColumns: string[] = ['select', 'productName', 'price', 'promotionalPrice', 'priceBefore', 'promotional'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selection = new SelectionModel<any>(true, []);

  constructor(
    private readonly productPromotionalService: ProductPromotionalService,
    private matDiaLog: MatDialog,
    private readonly toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.isLoading = true;
    this.productPromotionalService.getAll().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      }, error: err => {
        this.isLoading = false;
        this.toastrService.error('Lỗi load dữ liệu');
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete() {
    const diaLogRef = this.matDiaLog.open(ConfirmDialogComponent, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
      data: {
        title: 'Xoá sản phẩm khỏi khuyến mại!',
        message: 'Bạn có muốn xoá sản phẩm khỏi khuyến mại hay ko?',
      }
    });
    diaLogRef.afterClosed().subscribe(rs => {
      if (rs == Constants.RESULT_CLOSE_DIALOG.CONFIRM) {

        const idDelete = {
          id: []
        };

        for (let i = 0; i < this.selection.selected.length; i++) {
          idDelete.id.push(this.selection.selected[i].id);
        }

        if (idDelete.id.length == 0) {
          this.toastrService.warning('Vui lòng chọn đối tượng để xoá!');
          return;
        }

        this.isLoading = true;

        this.productPromotionalService.delete(idDelete);
        this.productPromotionalService.isCloseDialog.subscribe(data => {
          if (data) {
            this.selection.clear();
            this.getAll();
          }
        })
      }
    })

  }

  openSave(type) {
    const diaLogRef = this.matDiaLog.open(ProductPromotionalFormComponent, {
      width: '900px',
      hasBackdrop: true,
      disableClose: false,
      data: {
        type
      }
    })
    diaLogRef.afterClosed().subscribe(rs => {
      if (rs == Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
        this.getAll();
      }
    })
  }

  /** Whether the number of selected elements matches the total number of rows.
   * Số phần tử được chọn có khớp với tổng số hàng hay không*/
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. Chọn tất cả các hàng nếu chúng không được chọn tất cả; nếu không lựa chọn rõ ràng.*/
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row .Nhãn cho hộp kiểm trên hàng đã qua*/
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
