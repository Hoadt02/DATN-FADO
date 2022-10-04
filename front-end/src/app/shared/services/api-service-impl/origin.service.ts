import {Injectable} from '@angular/core';
import {ApiOriginService} from '../api-services/api-origin.service';
import {ToastrService, ToastToken} from "ngx-toastr";
import {error} from "protractor";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OriginService {

  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly apiOrigin: ApiOriginService,
    private toastrService: ToastrService
  ) {
  }

  getAll() {
    return this.apiOrigin.getAll();
  }

  create(data : any){
    return this.apiOrigin.create(data).subscribe({
      next: (data : any) =>{
        console.log(data);
        this.toastrService.success('Thêm thành công');
        this.isCloseDialog.next(true);
      }, error : err => {
        console.log(err);
        if (err.error.code == 'UNIQUE'){
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Thêm thất bại');
      }
    })
  }

  update(id:number,data : any){
    return this.apiOrigin.update(id,data).subscribe({
      next: (data : any) =>{
        console.log(data);
        this.toastrService.success('Sửa thành công');
        this.isCloseDialog.next(true);
      }, error : err => {
        console.log(err);
        if (err.error.code == 'UNIQUE'){
          this.toastrService.warning(err.error.message);
          return;
        }
        this.toastrService.error('Sửa thất bại');
      }
    })
  }

}
