import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageService} from "../service/jwt/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.storageService.isLoggedIn()) {
      void this.router.navigate(['/auth/login'],{queryParams:{redirectURL:state.url}});
      return false;
    } else {
      return true;
    }
  }

}
