import {Injectable} from '@angular/core';
import {ApiConstant} from "../../constants/api-constant";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(private sendMailService: SendMailService,
              private toastrService: ToastrService
  ) {
  }

  senMail(data: any) {
    return this.sendMailService.senMail(data).subscribe({
      next: (rs: any) => {
        console.log(rs);
        this.toastrService.success('Gửi mail thành công!');
      }, error: err => {
        console.log(err);
        this.toastrService.error('Gửi mail thất bại!');
      }
    });
  }

  sendMailWithAttachment(data: any) {
    return this.sendMailService.sendMailWithAttachment(data).subscribe({
      next: (rs: any) => {
        console.log(rs);
        this.toastrService.success('Gửi mail thành công!');
      }, error: err => {
        console.log(err);
        this.toastrService.error('Gửi mail thất bại!');
      }
    });
  }

}
