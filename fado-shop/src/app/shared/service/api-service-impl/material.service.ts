import {Injectable} from '@angular/core';
import {ApiMaterialService} from '../api-services/api-material.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly apiMaterial: ApiMaterialService,
  ) {
  }

  getAll() {
    return this.apiMaterial.getAll();
  }
}
