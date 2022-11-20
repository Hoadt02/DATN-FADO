import {Injectable} from '@angular/core';
import {ApiProductService} from '../api-services/api-product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private readonly apiProduct: ApiProductService,
  ) {
  }

  getAll() {
    return this.apiProduct.getAll();
  }

  create(data: any) {
    return this.apiProduct.create(data);
  }

  update(data: any) {
    return this.apiProduct.update(data);
  }

  findAllByCategoryId(id: any) {
    return this.apiProduct.findAllByCategoryId(id);
  }
}
