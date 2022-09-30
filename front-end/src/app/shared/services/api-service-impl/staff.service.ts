import {Injectable} from '@angular/core';
import {ApiStaffService} from "../api-services/api-staff.service";

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private readonly apiStaff: ApiStaffService,
  ) {
  }

  getAll() {
    return this.apiStaff.getAll();
  }

}
