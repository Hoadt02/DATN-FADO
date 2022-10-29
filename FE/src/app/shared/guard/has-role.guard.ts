import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageService} from "../services/jwt/storage.service";
import {Injectable} from "@angular/core";
import {Constants} from "../Constants";

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
    if (this.storageService.getAuthority() === Constants.TYPE_AUTH.SUPER_ADMIN) return true;
    return isAuthorized;
  }
}
