import {Injectable} from '@angular/core';
import {ToastrService, ToastToken} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';
import {ApiFaceDiameterService} from '../api-services/api-face-diameter.service';
import {ApiBatteryPowerService} from '../api-services/api-battery-power.service';

@Injectable({
  providedIn: 'root'
})
export class BatteryPowerService {

  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly apiBattery: ApiBatteryPowerService,
    private toastrService: ToastrService
  ) {
  }

  getAll() {
    return this.apiBattery.getAll();
  }

  create(data: any) {
    return this.apiBattery.create(data).subscribe({
      // tslint:disable-next-line:no-shadowed-variable
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Thêm thành công');
        this.isCloseDialog.next(true);
      }, error : err => {
        console.log(err);
        // tslint:disable-next-line:triple-equals
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Thêm thất bại');
      }
    })
  }

  update(id: number, data: any) {
    return this.apiBattery.update(id, data).subscribe({
      // tslint:disable-next-line:no-shadowed-variable
      next: (data: any) => {
        console.log(data);
        this.toastrService.success('Sửa thành công');
        this.isCloseDialog.next(true);
      }, error : err => {
        console.log(err);
        // tslint:disable-next-line:triple-equals
        if (err.error.code == 'UNIQUE') {
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Sửa thất bại');
      }
    })
  }

  delete(id: number, data: any) {
    data.status = 0;
    this.apiBattery.update(id, data).subscribe({
      // tslint:disable-next-line:no-shadowed-variable
      next: (data) => {
        console.log(data);
        this.toastrService.success('Xóa lượng pin thành công!');
      },
      error: (error) => {
        console.log(error);
        this.toastrService.error('Xóa lượng pin thất bại!');
        return;
      }
    });
  }

}
