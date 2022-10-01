import {Injectable} from '@angular/core';
import {ApiMaterialService} from '../api-services/api-material.service';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(
    private readonly apiMaterial: ApiMaterialService,
  ) {
  }

  getAll() {
    return this.apiMaterial.getAll();
  }

}
