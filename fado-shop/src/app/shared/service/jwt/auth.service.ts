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
              ) {
  }

  login(username: string, password: string): void {
    this.apiAuthService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUserToken(data);
      },
      error: err => {
        // this.toast.error(err.error.message);
      }
    });
  }

  logout(): void {
    this.storageService.clearToken();
    this.storageService.reloadPage();
  }

}
