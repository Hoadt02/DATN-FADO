import {Injectable} from '@angular/core';
import {ApiMaterialService} from '../api-services/api-material.service';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly apiMaterial: ApiMaterialService,
    private toastrService: ToastrService,
  ) {
  }

  getAll() {
    return this.apiMaterial.getAll();
  }
}
