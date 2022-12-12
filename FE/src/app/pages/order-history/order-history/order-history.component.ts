import {Component, OnInit, ViewChild} from '@angular/core';
import {Constants} from "../../../shared/Constants";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder} from "@angular/forms";
import {CustomerService} from "../../../shared/services/api-service-impl/customer.service";
import {OrderDetailService} from "../../../shared/services/api-service-impl/orderDetail.service";
import {OrderService} from "../../../shared/services/api-service-impl/order.service";
import {StorageService} from "../../../shared/services/jwt/storage.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {OrderHistoryDetailComponent} from "../order-history-detail/order-history-detail.component";

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  readonly STATUS_SUCCESS = Constants.STATUS_PAYMENT.SUCCESS;
  keySearch: any = null;
  listCustomer: any[] = [];
  isLoading = true;

  displayedColumns: string[] = ['index', 'customer', 'total', 'discount', 'totalPayment', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  formGroupFilter = this.fb.group({
    startDate: null,
    endDate: null,
    customerId: ''
  })

  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private orderDetailService: OrderDetailService,
              private orderService: OrderService,
              private storageService: StorageService,
              private matDiaLog: MatDialog,
              private toastrService: ToastrService,) {
  }

  ngOnInit(): void {
    this.getListHistory();
    this.getListCustomer();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterOrder() {
    console.log(this.formGroupFilter.getRawValue())
    this.isLoading = true;
    this.orderService.filterOrder(this.formGroupFilter.getRawValue()).subscribe((rs: any) => {
      this.dataSource = new MatTableDataSource<any>(rs);
      this.dataSource.sort = this.sort;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.toastrService.error('Lỗi load dữ liệu!')
      this.isLoading = false;

    })
  }

  getListCustomer() {
    this.customerService.getAll().subscribe((data: any) => {
      this.listCustomer = data;
    })
  }

  getListHistory() {
    this.isLoading = true;
    this.formGroupFilter.reset();
    this.orderService.getOrderHistory(this.storageService.getIdFromToken(), this.STATUS_SUCCESS).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      console.log('danh sach hoa don: ', data)
    }, error => {
      console.log(error)
      this.isLoading = false;
      this.toastrService.error('Lỗi load dữ liệu');
    })
  }

  openOrderDetail(row: any) {
    this.matDiaLog.open(OrderHistoryDetailComponent, {
      width: '1500px',
      height: '100%',
      disableClose: true,
      hasBackdrop: true,
      data: {row}
    });
  }

}
