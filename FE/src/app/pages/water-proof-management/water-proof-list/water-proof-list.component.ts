import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Constants} from '../../../shared/Constants';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {WaterProofFormComponent} from '../water-proof-form/water-proof-form.component';
import {OriginService} from '../../../shared/services/api-service-impl/origin.service';
import {ConfirmDialogComponent} from '../../../shared/confirm-dialog/confirm-dialog.component';
import {FaceDiameterService} from '../../../shared/services/api-service-impl/faceDiameter.service';
import {WaterProofService} from '../../../shared/services/api-service-impl/waterProof.service';

@Component({
  selector: 'app-battery-power-list',
  templateUrl: './water-proof-list.component.html',
  styleUrls: ['./water-proof-list.component.scss']
})
export class WaterProofListComponent implements OnInit {

  isLoading = true;
  readonly TYPE_DIALOG = Constants.TYPE_DIALOG;
  readonly RESULT_CLOSE_DIALOG = Constants.RESULT_CLOSE_DIALOG;
  title: string;
  message: string;
  status: boolean ;

  displayedColumns: string[] = ['index', 'name', 'status', 'thaoTac'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAll();
  }

  constructor(private fb: FormBuilder,
              private dialogService: MatDialog,
              private waterProof: WaterProofService,
              private matDialog: MatDialog,
  ) {
  }

  getAll() {
    this.waterProof.getAll().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDiaLog(type: string, row?: any) {
    this.dialogService.open(WaterProofFormComponent,
      {
        width: '600px',
        disableClose: true,
        hasBackdrop: true,
        data: {type, row}
      }).afterClosed().subscribe(result => {
      if (result === Constants.RESULT_CLOSE_DIALOG.SUCCESS) {
        this.getAll();
      }
      ;
    });
  }

  onDelete(id: number, data: any) {
    this.dialogService.open(ConfirmDialogComponent,
      {
        width: '25vw',
        data: {
          message: 'Bạn có muốn xóa độ chống này này?'
        }
      }).afterClosed().subscribe(  result => {
      // tslint:disable-next-line:triple-equals
      if (result == Constants.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.waterProof.delete(id, data);
      }
    });
  }
}
