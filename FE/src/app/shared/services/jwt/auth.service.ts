import {Injectable} from "@angular/core";
import {ApiAuthService} from "../api-services/api-auth.service";
import {StorageService} from "./storage.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiAuthService: ApiAuthService,
              private storageService: StorageService,
              private toast: ToastrService) {
  }

  login(username: string, password: string): void {
    this.apiAuthService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUserToken(data);
        this.storageService.reloadPage();
      },
      error: err => {
        if (err.error.code == 'NOT_FOUND'){
          this.toast.error(err.error.message);
          return;
        }

        if (err.error.code == 'LOGIN_FAILED'){
          this.toast.error(err.error.message);
          return;
        }

        if (err.error.code == 'USER_DISABLE'){
          this.toast.error(err.error.message);
          return;
        }
      }
    });
  }

  logout(): void {
    this.storageService.clearToken();
    this.storageService.reloadPage();
  }

}
