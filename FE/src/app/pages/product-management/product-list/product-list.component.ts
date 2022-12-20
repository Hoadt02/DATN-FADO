import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

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
import {WaterProofService} from "../../../shared/services/api-service-impl/waterProof.service";
import {FaceDiameterService} from "../../../shared/services/api-service-impl/faceDiameter.service";
import {BatteryPowerService} from "../../../shared/services/api-service-impl/batteryPower.service";
import {StorageService} from "../../../shared/services/jwt/storage.service";


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  readonly TYPE_DIALOG = Constants.TYPE_DIALOG;

  isLoading:boolean;
  panelOpenState = false;
  role: boolean;

  listProductDetails: any[] = [];
  listProduct: any[] = [];
  listBrand: any[] = [];
  listOrigin: any[] = [];
  listMaterial: any[] = [];
  listWaterproof: any[] = [];
  listFacediameter: any[] = [];
  listBatterypower: any[] = [];

  formGroup = this.fb.group({
    product_id: [null],
    brand_id: [null],
    material_id: [null],
    origin_id: [null],
    waterproof_id: [null],
    facediameter_id: [null],
    batterypower_id: [null],
    status: [null],
    gender: [null]
  });

  keySearch:any = null;

  displayedColumns: string[] = ['index' , 'avatar-product', 'name', 'price', 'quantity', 'gender', 'createDate', 'status', 'thaoTac'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    if (this.storageService.getAuthority() === Constants.TYPE_AUTH.SUPER_ADMIN){
      this.role = true
    }else {
      this.role = false;
    }
    this.getAll();
    this.getProductForCombobox();
    this.getBrandForCombobox();
    this.getMaterialForCombobox();
    this.getOriginForCombobox();
    this.getWaterproofForCombobox();
    this.getFacediameterForCombobox();
    this.getBatterypowerForCombobox();
  }

  constructor(private fb: FormBuilder,
              private dialogService: MatDialog,
              private service: ProductDetailsService,
              private toastrService: ToastrService,
              private brandService: BrandService,
              private productService: ProductService,
              private originService: OriginService,
              private materialService: MaterialService,
              private waterproofService: WaterProofService,
              private facediameterService: FaceDiameterService,
              private batterypowerService: BatteryPowerService,
              private storageService: StorageService) {
  }

  getAll() {
    this.isLoading = true;
    this.service.getAllProductDetail().subscribe({
      next: (data: any) => {
        this.listProductDetails = data;
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

    getAllFilter() {
    this.isLoading = true;
    this.keySearch = null;
    this.service.findProductWithFilter(this.formGroup.getRawValue()).subscribe({
      next: (data: any) => {
        this.listProductDetails = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
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
    this.formGroup.patchValue({product_id:null, brand_id:null, material_id:null, origin_id:null,
      waterproof_id:null, facediameter_id:null, batterypower_id:null, status:null, gender:null});
    this.keySearch = null;
    this.getAll();
  }

  applyFilter(event: Event) {
    this.formGroup.patchValue({product_id:null, brand_id:null, material_id:null, origin_id:null,
      waterproof_id:null, facediameter_id:null, batterypower_id:null, status:null, gender:null});

    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    let data;
    if (isNaN(filterValue as any)){
      data = this.listProductDetails.filter(n => n.name.toLowerCase().includes(filterValue));
    } else {
      data = this.listProductDetails.filter(n => n.imei.toLowerCase().includes(filterValue));
    }
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDiaLog(type: string, row?: any) {
    this.dialogService.open(ProductFormComponent,
      {
        disableClose: true,
        width: '1200px',
        data: {type, row}
      }).afterClosed().subscribe(result => {
      if (result == Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
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
      this.listBrand = data;
    });
  }

  getProductForCombobox() {
    this.productService.getAll().subscribe((data: any) => {
      this.listProduct = data;
    });
  }

  getOriginForCombobox() {
    this.originService.getAll().subscribe((data: any) => {
      this.listOrigin = data;
    });
  }

  getMaterialForCombobox() {
    this.materialService.getAll().subscribe((data: any) => {
      this.listMaterial = data;
    });
  }

  getWaterproofForCombobox(){
    this.waterproofService.getAll().subscribe((data: any) => {
      this.listWaterproof = data;
    });
  }

  getFacediameterForCombobox(){
    this.facediameterService.getAll().subscribe((data: any) => {
      this.listFacediameter = data;
    });
  }

  getBatterypowerForCombobox(){
    this.batterypowerService.getAll().subscribe((data: any) => {
      this.listBatterypower = data;
    });
  }

  setNameProduct(name:string){
    if (name.length > 30){
      name = name.substring(0,27) + '...';
      return name;
    }
    return name;
  }
}
