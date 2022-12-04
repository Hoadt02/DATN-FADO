import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';

@Injectable({
  providedIn: 'root'
})
export class ApiUploadImageToHostService {

  constructor(
    private http: HttpClient
  ) { }

  uploadImageToHost(files: any) {
    return this.http.post(`${ApiConstant.uploadImageToHost}`, files);
  }
}
