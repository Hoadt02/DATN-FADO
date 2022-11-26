import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderDetailService} from "../../../shared/services/api-service-impl/orderDetail.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrderService} from "../../../shared/services/api-service-impl/order.service";
import {StorageService} from "../../../shared/services/jwt/storage.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SellHistoryDetailComponent} from "../sell-history-detail/sell-history-detail.component";
import {Constants} from "../../../shared/Constants";

@Component({
  selector: 'app-sell-at-store-history',
  templateUrl: './sell-at-store-history.component.html',
  styleUrls: ['./sell-at-store-history.component.scss']
})
export class SellAtStoreHistoryComponent implements OnInit {

  readonly STATUS_SUCCESS = Constants.STATUS_PAYMENT.SUCCESS;
  readonly STATUS_CANCEL = Constants.STATUS_PAYMENT.CANCEL;

  displayedColumnsS: string[] = ['index', 'customer', 'total', 'discount', 'totalPayment', 'date', 'action'];
  dataSourcePayment!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorS!: MatPaginator;
  @ViewChild(MatSort) sortS!: MatSort;

  displayedColumnsC: string[] = ['index', 'customer', 'total', 'discount', 'totalPayment', 'date', 'action'];
  dataSourceCancel!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorC!: MatPaginator;
  @ViewChild(MatSort) sortC!: MatSort;

  constructor(private orderDetailService: OrderDetailService,
              private orderService: OrderService,
              private storageService: StorageService,
              private matDataRef: MatDialogRef<SellAtStoreHistoryComponent>,
              private matDiaLog: MatDialog) {
  }

  ngOnInit(): void {
    this.getListHistoryS();
    this.getListHistoryC();
  }

  getListHistoryS() {
    this.orderService.getOrderHistory(this.storageService.getIdFromToken(), this.STATUS_SUCCESS).subscribe((data: any) => {
      this.dataSourcePayment = new MatTableDataSource(data);
      this.dataSourcePayment.paginator = this.paginatorS;
      this.dataSourcePayment.sort = this.sortS;
      console.log('danh sach hoa don da ban: ', data)
    }, error => {
      console.log(error)
    })
  }

  getListHistoryC() {
    this.orderService.getOrderHistory(this.storageService.getIdFromToken(), this.STATUS_CANCEL).subscribe((data2: any) => {
      this.dataSourceCancel = new MatTableDataSource(data2);
      this.dataSourceCancel.paginator = this.paginatorC;
      this.dataSourceCancel.sort = this.sortC;
      console.log('danh sach hoa don da huy: ', data2)
    }, error => {
      console.log(error)
    })
  }

  openOrderDetail(row: any) {
    const dialogRef = this.matDiaLog.open(SellHistoryDetailComponent, {
      width: '1000px',
      disableClose: true,
      hasBackdrop: true,
      data: {row}
    });
    dialogRef.afterClosed().subscribe(rs => {
      console.log(rs);
    })
  }

  close() {
    this.matDataRef.close();
  }
}
