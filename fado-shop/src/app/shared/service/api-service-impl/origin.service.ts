import {Injectable} from '@angular/core';
import {ApiOriginService} from '../api-services/api-origin.service';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OriginService {

  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly apiOrigin: ApiOriginService
  ) {
  }

  getAll() {
    return this.apiOrigin.getAll();
  }
}
