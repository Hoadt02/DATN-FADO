import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {StaffService} from '../../../shared/services/api-service-impl/staff.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

  loading = true;

  displayedColumns: string[] =
    [
      'id', 'firstname', 'lastname',
      'dateOfBirth', 'image', 'username',
      'email', 'phoneNumber', 'gender',
      'address', 'status', 'role'
    ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiStaff: StaffService,
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.apiStaff.getAll().subscribe({
      next: (data: any) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      }, error: (err => {
        console.log(err);
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

}
