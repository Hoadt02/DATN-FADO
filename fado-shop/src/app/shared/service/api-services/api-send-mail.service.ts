import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiConstant} from "../../constants/api-constant";
import {Observable} from "rxjs";

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

  verificationOTP(code:any){
    return this.http.get(`${ApiConstant.sendMail}/${code}`);
  }

  sendMailAgain(email:any){
    return this.http.post(ApiConstant.sendMailAgain, email);
  }

  sendMailContact(data:any):Observable<any>{
    return this.http.post(ApiConstant.sendMailContact, data);
  }
}
