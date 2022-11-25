import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderDetailService} from "../../../shared/services/api-service-impl/orderDetail.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-sell-history-detail',
  templateUrl: './sell-history-detail.component.html',
  styleUrls: ['./sell-history-detail.component.scss']
})
export class SellHistoryDetailComponent implements OnInit {

  displayedColumns: string[] = ['index', 'image', 'name' , 'price', 'quantity'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private matDataRef: MatDialogRef<SellHistoryDetailComponent>,
              @Inject(MAT_DIALOG_DATA) private dataDiaLog: any,
              private orderDetailService: OrderDetailService) { }

  ngOnInit(): void {
    this.orderDetailService.findOrderDetailByOrder(this.dataDiaLog.row.id).subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  close() {
    this.matDataRef.close();
  }

}
