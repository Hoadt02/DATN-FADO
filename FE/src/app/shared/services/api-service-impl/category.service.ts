import {Injectable} from '@angular/core';
import {ApiCategoryService} from '../api-services/api-category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private readonly apiCategory: ApiCategoryService,
  ) {
  }

  getAll() {
    return this.apiCategory.getAll();
  }

  create(data: any) {
    return this.apiCategory.create(data);
  }

  update(data: any) {
    return this.apiCategory.update(data);
  }

}
