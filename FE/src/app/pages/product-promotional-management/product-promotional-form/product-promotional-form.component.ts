import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {ToastrService} from "ngx-toastr";
import {ProductPromotionalService} from "../../../shared/services/api-service-impl/product-promotional.service";
import {ProductDetailsService} from "../../../shared/services/api-service-impl/product-details.service";
import {PromotionalService} from "../../../shared/services/api-service-impl/promotional.service";
import {FormBuilder} from "@angular/forms";
import {Constants} from "../../../shared/Constants";
import {MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "../../../shared/services/api-service-impl/category.service";
import {ProductService} from "../../../shared/services/api-service-impl/product.service";

@Component({
  selector: 'app-product-promotional-form',
  templateUrl: './product-promotional-form.component.html',
  styleUrls: ['./product-promotional-form.component.scss']
})
export class ProductPromotionalFormComponent implements OnInit {
  isLoading = false;
  promotionalList: any[];
  idPromotional?: any;
  categories: any[];
  products: any[];
  filterCategories: any;
  filterProducts: any;

  dataProductPromotion: any = [];

  displayedColumns: string[] = ['select', 'name', 'price'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  selection = new SelectionModel<any>(true, []);

  constructor(
    private readonly productDetailsService: ProductDetailsService,
    private readonly productPromotionalService: ProductPromotionalService,
    private readonly promotionalService: PromotionalService,
    private readonly categoryService: CategoryService,
    private readonly productService: ProductService,
    private toastrService: ToastrService,
    private matDialogRef: MatDialogRef<ProductPromotionalFormComponent>,
  ) {
  }

  ngOnInit(): void {
    this.getProductNotInPromotional();
    this.findAllByStatusTrue();
    this.getAllCategory();
  }

  /**Danh sách khuyến mại đang hoạt động ở ô select*/
  findAllByStatusTrue() {
    this.promotionalService.findAllByStatusTrue().subscribe({
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

  getAllCategory() {
    this.categoryService.getAll().subscribe({
      next: (data: any) => {
        this.categories = data.filter(c => c.status == 1);
      }, error: err => {
        console.log(err);
      }
    })
  }

  findAllProductByCategoryId(id : number) {
    this.productService.findAllByCategoryId(id).subscribe({
      next: (data: any) => {
        this.products = data;
      }, error: err => {
        console.log(err);
      }
    })
  }

  getFilterCategory() {
    this.filterProducts = null;
    this.isLoading = true;
    this.productPromotionalService.getProductNotInPromotional().subscribe({
      next: (data: any) => {
        data = data.filter(c => c.product.category.id == this.filterCategories)
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }, error: (err => {
        this.toastrService.error('Lỗi tải dữ liệu');
        console.log(err);
        this.isLoading = false;
        return;
      })
    })
  }

  getFilterProduct() {
    this.isLoading = true;
    this.productPromotionalService.getProductNotInPromotional().subscribe({
      next: (data: any) => {
        data = data.filter(c => c.product.id == this.filterProducts)
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }, error: (err => {
        this.toastrService.error('Lỗi tải dữ liệu');
        console.log(err);
        this.isLoading = false;
        return;
      })
    })
  }

  /**Danh sách sản phẩm ko tồn tại trong khuyến mại đang hoạt động*/
  getProductNotInPromotional() {
    this.filterCategories = null;
    this.filterProducts = null;
    this.selection.clear();
    this.isLoading = true;
    this.productPromotionalService.getProductNotInPromotional().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      }, error: (err => {
        this.toastrService.error('Lỗi tải dữ liệu');
        this.isLoading = false;
        console.log(err);
        return;
      })
    })
  }

  getIdPromotional(id: any) {
    this.idPromotional = id;
  }

  save() {
    if (this.selection.selected.length <= 0) {
      this.toastrService.warning('Vui lòng chọn sản phẩm để thêm!');
      return;
    }

    if (this.idPromotional == undefined) {
      this.toastrService.warning('Vui lòng chọn chương trình khuyến mại!');
      return;
    }

    this.isLoading = true;
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
        this.productPromotionalService.isCloseDialog.next(false);
        this.getProductNotInPromotional();
        this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
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
