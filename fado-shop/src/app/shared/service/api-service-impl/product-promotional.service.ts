import {Injectable} from '@angular/core';
import {ApiProductPromotionalService} from "../api-services/api-product-promotional.service";
import {ApiConstant} from "../../constants/api-constant";

@Injectable({
  providedIn: 'root'
})
export class ProductPromotionalService {

  constructor(
    private apiProductPromotional: ApiProductPromotionalService
  ) {
  }

  getAllProductPromotional() {
    return this.apiProductPromotional.getAllProductPromotional();
  }

  findAllProductPromotionalInCart(idCtm: number) {
    return this.apiProductPromotional.findAllProductPromotionalInCart(idCtm);
  }
}
