import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConstant} from '../../constants/api-constant';
import {Observable} from 'rxjs';

const httpOptions: any = {
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
export class ApiAuthService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${ApiConstant.auth}/sign-in-staff`,
      {
        username,
        password
      });
  }
}
