import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";

let httpOptions: any = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiSendMailService {

  constructor(private http: HttpClient) {
  }

  senMail(data: any) {
    return this.http.post(ApiConstant.sendMail, data, httpOptions);
  }

  sendMailWithAttachment(data: any) {
    return this.http.post(ApiConstant.sendMailWithAttachment, data, httpOptions);
  }
}
