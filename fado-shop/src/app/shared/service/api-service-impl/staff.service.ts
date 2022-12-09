import {Injectable} from '@angular/core';
import {ApiStaffService} from '../api-services/api-staff.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(
    private readonly apiStaff: ApiStaffService,
    private toastrService: ToastrService,
  ) {
  }

  getAll() {
    return this.apiStaff.getAll();
  }

  findById(id: number) {
    return this.apiStaff.findById(id).subscribe({
      next: (_: any) => {
      }, error: err => {
        if (err.error.code == 'NOT_FOUND') {
          this.toastrService.warning(err.error.message);
        }
        console.log(err);
      }
    })
  }
}
