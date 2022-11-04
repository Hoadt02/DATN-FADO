import {Injectable} from "@angular/core";
import {ApiAuthService} from "../api-services/api-auth.service";
import {StorageService} from "./storage.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../api-service-impl/customer.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiAuthService: ApiAuthService,
              private customerService: CustomerService,
              private storageService: StorageService,
              private toastrService: ToastrService,
              private route: ActivatedRoute,
              private router: Router,) {
  }

  login(username: string, password: string): void {
    this.apiAuthService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUserToken(data);
        this.redirectURL();
      },
      error: err => {
        if (err.error.code == 'NOT_FOUND'){
          this.toastrService.error(err.error.message);
          return;
        }

        if (err.error.code == 'LOGIN_FAILED'){
          this.toastrService.error(err.error.message);
          return;
        }

        if (err.error.code == 'USER_DISABLE'){
          this.toastrService.error(err.error.message);
          return;
        }
      }
    });
  }

  logout(): void {
    this.storageService.clearToken();
    void this.router.navigate([''])
      .then(() => this.storageService.reloadPage());
  }

  redirectURL(){
    let redirectURL = null;
    let params = this.route.snapshot.queryParams;
    if (params.redirectURL){
      redirectURL = params.redirectURL;
    }

    if (redirectURL){
      this.router.navigate([redirectURL])
        .then(() => this.storageService.reloadPage())
        .catch(() => this.router.navigate(['']));
    }else {
      void this.router.navigate([''])
        .then(() => this.storageService.reloadPage());
    }
  }
}
