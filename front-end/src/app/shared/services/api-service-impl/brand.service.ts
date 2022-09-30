import {Injectable} from '@angular/core';
import {ApiBrandService} from '../api-services/api-brand.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private readonly apiBrand: ApiBrandService,
  ) {
  }

  getAll() {
    return this.apiBrand.getAll();
  }

}
