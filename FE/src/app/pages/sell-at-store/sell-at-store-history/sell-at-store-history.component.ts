import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderDetailService} from "../../../shared/services/api-service-impl/orderDetail.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {OrderService} from "../../../shared/services/api-service-impl/order.service";
import {StorageService} from "../../../shared/services/jwt/storage.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {SellHistoryDetailComponent} from "../sell-history-detail/sell-history-detail.component";

@Component({
  selector: 'app-sell-at-store-history',
  templateUrl: './sell-at-store-history.component.html',
  styleUrls: ['./sell-at-store-history.component.scss']
})
export class SellAtStoreHistoryComponent implements OnInit {

  listHistoryPayment: any[] = [];
  listHistoryCancel: any[] = [];
  displayedColumns: string[] = ['index', 'customer', 'total', 'discount', 'totalPayment', 'date', 'action'];
  dataSourceCancel!: MatTableDataSource<any>;
  dataSourcePayment!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderDetailService: OrderDetailService,
              private orderService: OrderService,
              private storageService: StorageService,
              private matDataRef: MatDialogRef<SellAtStoreHistoryComponent>,
              private matDiaLog: MatDialog,) {
  }

  ngOnInit(): void {
    this.getListHistory1();
    this.getListHistory2();
  }

  getListHistory1() {
    this.orderService.getOrderHistory(this.storageService.getIdFromToken(), 3).subscribe((data: any) => {
      this.dataSourcePayment = new MatTableDataSource(data);
      this.dataSourcePayment.paginator = this.paginator;
      this.dataSourcePayment.sort = this.sort;
      console.log('danh sach hoa don da ban: ', data)
    }, error => {
      console.log(error)
    })
  }

  getListHistory2() {
    this.orderService.getOrderHistory(this.storageService.getIdFromToken(), 4).subscribe((data: any) => {
      this.dataSourceCancel = new MatTableDataSource(data);
      this.dataSourceCancel.paginator = this.paginator;
      this.dataSourceCancel.sort = this.sort;
      console.log('danh sach hoa don da huy: ', data)
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
