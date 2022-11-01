import {Injectable} from "@angular/core";
import {ApiAuthService} from "../api-services/api-auth.service";
import {StorageService} from "./storage.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiAuthService: ApiAuthService,
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
        setTimeout(() => {
          this.storageService.reloadPage();
        }, 500);
      },
      error: err => {
        this.toastrService.error(err.error.message);
      }
    });
  }

  logout(): void {
    this.storageService.clearToken();
    void this.router.navigate(['']);
  }

  redirectURL(){
    let redirectURL = null;
    let params = this.route.snapshot.queryParams;
    if (params.redirectURL){
      redirectURL = params.redirectURL;
    }

    if (redirectURL){
      this.router.navigateByUrl(redirectURL).catch(() => this.router.navigate(['']));
    }else {
      void this.router.navigate(['']);
    }
  }
}
