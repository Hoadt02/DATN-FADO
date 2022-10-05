import {Injectable} from '@angular/core';
import {ApiConstant} from "../../constants/api-constant";
import {ToastrService} from "ngx-toastr";
import {ApiSendMailService} from "../api-services/api-send-mail.service";

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(private apiSendMailService: ApiSendMailService,
              private toastrService: ToastrService
  ) {
  }

  senMail(data: any) {
    return this.apiSendMailService.senMail(data).subscribe({
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
    return this.apiSendMailService.sendMailWithAttachment(data).subscribe({
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
