import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {async} from "rxjs";

const USER_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private jwtHelper = new JwtHelperService();

  constructor() {
  }

  public saveUserToken(userToken: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(userToken));
  }

  public getUserToken(): any {
    const userToken = window.localStorage.getItem(USER_KEY);
    if (userToken) {
      return JSON.parse(userToken);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    let authToken = this.getUserToken();
    return authToken !== undefined && authToken?.token !== undefined;
  }

  getToken() {
    let authToken = this.getUserToken();
    return authToken !== null && authToken?.token !== null ? authToken?.token : null;
  }

  clearToken() {
    window.localStorage.removeItem(USER_KEY);
  }

  reloadPage(): void {
    window.location.reload();
  }

  // Thong tin bo sung-------------------------------------------
  getDecodeToken(){
    try {
      const decodeToken = this.jwtHelper.decodeToken(this.getToken());
      return decodeToken !== null ? decodeToken : null;
    }catch (e) {
      this.clearToken();
      this.reloadPage();
    }
  }

  getFullNameFromToken(){
    const objectToken = this.getDecodeToken();
    return objectToken !== null && objectToken?.name !== null ? objectToken?.name : '';
  }

  getIdFromToken(){
    const objectToken = this.getDecodeToken();
    return objectToken !== null && objectToken?.id !== null ? objectToken?.id : null;
  }

  getAuthority(){
    const objectToken = this.getDecodeToken();
    return objectToken !== null && objectToken?.authority !== null ? objectToken?.authority : null;
  }

  isExpired(){
    return this.jwtHelper.isTokenExpired(this.getToken());
  }
}
