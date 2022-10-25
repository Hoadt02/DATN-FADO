import {Injectable} from "@angular/core";
import {ApiImageService} from "../api-services/api-image.service";
import {ToastrService} from "ngx-toastr";
import {ProductDetailsService} from "./product-details.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService{

  constructor(private apiImageService: ApiImageService) {
  }

  getImagesByIdProductDetail(id:number){
    return this.apiImageService.getImagesByIdProductDetail(id);
  }
}
