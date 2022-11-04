import {Component, Input, OnInit, ViewChild} from '@angular/core';

import {FormBuilder} from '@angular/forms';
import {Constants} from '../../../shared/Constants';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ProductFormComponent} from '../product-form/product-form.component';
import {ProductDetailsService} from '../../../shared/services/api-service-impl/product-details.service';
import {ConfirmDialogComponent} from '../../../shared/confirm-dialog/confirm-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {ProductViewComponent} from '../product-view/product-view.component';
import {BrandService} from '../../../shared/services/api-service-impl/brand.service';
import {MaterialService} from '../../../shared/services/api-service-impl/material.service';
import {ProductService} from "../../../shared/services/api-service-impl/product.service";
import {OriginService} from "../../../shared/services/api-service-impl/origin.service";
import {StorageService} from "../../../shared/services/jwt/storage.service";
import {CustomerFormComponent} from "../../customer-management/customer-form/customer-form.component";
import {StaffFormComponent} from "../../staff-management/staff-form/staff-form.component";
import {CategoryService} from "../../../shared/services/api-service-impl/category.service";
import {CategoryFormComponent} from "../../category-management/category-form/category-form.component";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  readonly TYPE_DIALOG = Constants.TYPE_DIALOG;
  readonly TYPE_FILTER = Constants.TYPE_FILTER;

  isLoading = true;
  panelOpenState = false;

  listProduct: any[] = [];
  listBrand: any[] = [];
  listOrigin: any[] = [];
  listMaterial: any[] = [];

  name_filter:string;
  value_filter:string;

  displayedColumns: string[] = ['index' , 'avatar-product', 'name', 'price', 'quantity', 'gender', 'createDate', 'status', 'thaoTac'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAll();
    this.getProductForCombobox();
    this.getBrandForCombobox();
    this.getMaterialForCombobox();
    this.getOriginForCombobox();
  }

  constructor(private fb: FormBuilder,
              private dialogService: MatDialog,
              private service: ProductDetailsService,
              private toastrService: ToastrService,
              private brandService: BrandService,
              private productService: ProductService,
              private originService: OriginService,
              private materialService: MaterialService,) {
  }

  getAll() {
    this.service.getAllProductDetail().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.toastrService.warning('Lỗi load dữ liệu!');
      }
    });
  }

    getAllFilter(type: string, check: any) {
    this.isLoading = true;
    this.service.getAllProductDetail().subscribe({
      next: (data: any) => {
        if (type == this.TYPE_FILTER.PRODUCT) {
          data = data.filter(n => n.product.id == check);
          this.name_filter = '➣ Dòng sản phẩm ➣';
          this.value_filter = this.listProduct.filter(n => n.id == check)[0].name;

        } else if (type == this.TYPE_FILTER.BRAND) {
          data = data.filter(n => n.brand.id == check);
          this.name_filter = ' ➣ Thương hiệu ➣';
          this.value_filter = this.listBrand.filter(n => n.id == check)[0].name;

        } else if (type == this.TYPE_FILTER.MATERIAL) {
          data = data.filter(n => n.material.id == check);
          this.name_filter = '➣ Chất liệu ➣';
          this.value_filter = this.listMaterial.filter(n => n.id == check)[0].name;

        } else if (type == this.TYPE_FILTER.ORIGIN) {
          data = data.filter(n => n.origin.id == check);
          this.name_filter = '➣ Xuất xứ ➣';
          this.value_filter = this.listOrigin.filter(n => n.id == check)[0].name;

        } else if (type == this.TYPE_FILTER.STATUS) {
          data = data.filter(n => n.status == check);
          this.name_filter = '➣ Trạng thái ➣';
          this.value_filter = check == 1 ? 'Hoạt động': 'Ngưng hoạt động';

        } else if (type == this.TYPE_FILTER.GENDER) {
          data = data.filter(n => n.gender == check);
          this.name_filter = '➣ Đối tượng sử dụng ➣';
          this.value_filter = check == 1 ? 'Nam':'Nữ';
        }

        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.toastrService.warning('Lỗi load dữ liệu!');
      }
    });
  }

  onResetFilter() {
    this.isLoading = true;
    this.getAll();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDiaLog(type: string, row?: any) {
    this.dialogService.open(ProductFormComponent,
      {
        disableClose: true,
        width: '900px',
        data: {type, row}
      }).afterClosed().subscribe(result => {
      if (result == Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
        this.isLoading = true;
        this.getAll();
      };
    });
  }

  openDeleteOrNoDelete(data: any, id: number, type:number) {
    this.dialogService.open(ConfirmDialogComponent,
      {
        width: '25vw',
        data: {
          message: `Bạn có muốn ${type == 1 ? 'kích hoạt':'vô hiệu hóa'} sản phẩm này?`
        }
      }).afterClosed().subscribe(  result => {
      if (result == Constants.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.service.activeOrInActiveProductDetail(data, id, type);
      }
    });
  }

  openViewDialog(row: any) {
    this.dialogService.open(ProductViewComponent,
      {
        disableClose: true,
        width: '800px',
        height: '600px',
        data: row
      });
  }

  getBrandForCombobox() {
    this.brandService.getAll().subscribe((data: any) => {
      if (data) {
        this.listBrand = data;
      }
    });
  }

  getProductForCombobox() {
    this.productService.getAll().subscribe((data: any) => {
      if (data) {
        this.listProduct = data;
      }
    });
  }

  getOriginForCombobox() {
    this.originService.getAll().subscribe((data: any) => {
      if (data) {
        this.listOrigin = data;
      }
    });
  }

  getMaterialForCombobox() {
    this.materialService.getAll().subscribe((data: any) => {
      if (data) {
        this.listMaterial = data;
      }
    });
  }
}
