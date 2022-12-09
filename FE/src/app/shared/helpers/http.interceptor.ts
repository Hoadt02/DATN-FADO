import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from "../services/jwt/storage.service";
import {AuthService} from "../services/jwt/auth.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService,
    private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //check token hết hạn
    if (this.storageService.isLoggedIn() && this.storageService.isExpired()){
      this.authService.logout();
    }

    //gửi request kèm token về
    const userToken = this.storageService.getToken();
    let httpHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'token': "29d3bc2a-5e3d-11ed-8a70-52fa25d1292f",
      'shop_id': "1034510",
    });
    if (userToken != null) {
      httpHeader = httpHeader.append('Authorization', 'Bearer ' + userToken)
    }
    req = req.clone({
      headers: httpHeader
    });
    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];
