import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {StorageService} from "../service/jwt/storage.service";

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate{

  constructor(private storageService: StorageService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthorized = this.storageService.getAuthority() === route.data.role;
    return isAuthorized;
  }
}
