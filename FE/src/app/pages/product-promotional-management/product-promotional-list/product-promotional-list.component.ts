import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductPromotionalService} from "../../../shared/services/api-service-impl/product-promotional.service";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProductPromotionalFormComponent} from "../product-promotional-form/product-promotional-form.component";
import {Constants} from "../../../shared/Constants";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-promotional-form-list',
  templateUrl: './product-promotional-list.component.html',
  styleUrls: ['./product-promotional-list.component.scss']
})
export class ProductPromotionalListComponent implements OnInit {

  isLoading = true;
  TYPE_DIALOG = Constants.TYPE_DIALOG;
  RESULT_CLOSE_DIALOG = Constants.RESULT_CLOSE_DIALOG;

  displayedColumns: string[] = ['stt', 'productName', 'price', 'promotionalPrice', 'priceBefore', 'promotional', 'control'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly productPromotionalService : ProductPromotionalService,
    private matDiaLog: MatDialog,
    private readonly toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
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

  openSave(type) {
    this.matDiaLog.open(ProductPromotionalFormComponent, {
      width: '900px',
      height: '600px',
      hasBackdrop: true,
      disableClose: false,
      data: {
        type
      }
    })
  }
}
