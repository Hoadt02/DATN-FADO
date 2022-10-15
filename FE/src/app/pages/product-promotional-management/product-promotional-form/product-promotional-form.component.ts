import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {ToastrService} from "ngx-toastr";
import {ProductPromotionalService} from "../../../shared/services/api-service-impl/product-promotional.service";
import {ProductDetailsService} from "../../../shared/services/api-service-impl/product-details.service";
import {PromotionalService} from "../../../shared/services/api-service-impl/promotional.service";

@Component({
  selector: 'app-product-promotional-form',
  templateUrl: './product-promotional-form.component.html',
  styleUrls: ['./product-promotional-form.component.scss']
})
export class ProductPromotionalFormComponent implements OnInit {
  isLoading = true;
  promotionalList: any[];

  displayedColumns: string[] = ['select', 'name', 'price'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  selection = new SelectionModel<any>(true, []);

  constructor(
    private readonly productDetailsService: ProductDetailsService,
    private readonly productPromotionalService: ProductPromotionalService,
    private readonly promotionalService: PromotionalService,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllPromotional();
  }

  getAllPromotional() {
    this.promotionalService.getAll().subscribe({
      next: (data: any) => {
        this.promotionalList = data as any[];
        console.log(this.promotionalList);
      }, error: (err => {
        this.toastrService.error('Lỗi tải dữ liệu');
        console.log(err);
        return;
      })
    })
  }

  getProductNotInPromotional(id: number) {
    this.isLoading = true;
    this.productPromotionalService.getProductNotInPromotional(id).subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        console.log(data);
        this.isLoading = false;
      }, error: (err => {
        this.toastrService.error('Lỗi tải dữ liệu');
        this.isLoading = false;
        console.log(err);
        return;
      })
    })
  }

  getAll() {
    this.productDetailsService.getAllProductDetail().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        console.log(data);
        this.isLoading = false;
      }, error: (err => {
        this.toastrService.error('Lỗi tải dữ liệu');
        this.isLoading = false;
        console.log(err);
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
