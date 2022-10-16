import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {ToastrService} from "ngx-toastr";
import {ProductPromotionalService} from "../../../shared/services/api-service-impl/product-promotional.service";
import {ProductDetailsService} from "../../../shared/services/api-service-impl/product-details.service";
import {PromotionalService} from "../../../shared/services/api-service-impl/promotional.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-product-promotional-form',
  templateUrl: './product-promotional-form.component.html',
  styleUrls: ['./product-promotional-form.component.scss']
})
export class ProductPromotionalFormComponent implements OnInit {
  isLoading = false;
  promotionalList: any[];
  idPromotional?: any;

  dataProductPromotion: any = [];

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
    // this.getAll();
    this.getAllPromotional();
  }

  getAllPromotional() {
    this.isLoading = true;
    this.promotionalService.getAll().subscribe({
      next: (data: any) => {
        this.promotionalList = data as any[];
        console.log(this.promotionalList);
        this.isLoading = false;
      }, error: (err => {
        this.toastrService.error('Lỗi tải dữ liệu');
        console.log(err);
        this.isLoading = false;
        return;
      })
    })
  }

  getProductNotInPromotional(id: number) {
    this.selection.clear();
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
    this.idPromotional = id;
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

  save() {
    this.isLoading = true;

    if (this.idPromotional == undefined) {
      this.toastrService.warning('Vui lòng chọn chương trình khuyến mại!');
      return;
    }

    for (let i = 0; i < this.selection.selected.length; i++) {
      this.dataProductPromotion.push(
        {
          promotional: {
            id: this.idPromotional
          },
          productDetail: {
            id: this.selection.selected[i].id
          },
        }
      );
    }

    this.productPromotionalService.create(this.dataProductPromotion);

    this.productPromotionalService.isCloseDialog.subscribe(data => {
      if (data) {
        this.isLoading = false;
        this.getProductNotInPromotional(this.idPromotional);
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
