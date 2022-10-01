import {Injectable} from '@angular/core';
import {ApiOriginService} from '../api-services/api-origin.service';

@Injectable({
  providedIn: 'root'
})
export class OriginService {

  constructor(
    private readonly apiOrigin: ApiOriginService,
  ) {
  }

  getAll() {
    return this.apiOrigin.getAll();
  }

}
