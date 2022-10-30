import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";

@Injectable({
  providedIn: 'root'
})
export class ApiSendMailService {

  constructor(private http: HttpClient) {
  }

  senMail(data: any) {
    return this.http.post(ApiConstant.sendMail, data);
  }

  sendMailWithAttachment(data: any) {
    return this.http.post(ApiConstant.sendMailWithAttachment, data);
  }
}
