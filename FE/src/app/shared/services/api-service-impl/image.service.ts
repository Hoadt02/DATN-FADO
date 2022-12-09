import {Injectable} from "@angular/core";
import {ApiImageService} from "../api-services/api-image.service";
import {ToastrService} from "ngx-toastr";
import {ProductDetailsService} from "./product-details.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService{

  constructor(private apiImageService: ApiImageService,
              private toastrService: ToastrService) {
  }

  getImagesByIdProductDetail(id:number){
    return this.apiImageService.getImagesByIdProductDetail(id);
  }

  createImage(data:any){
     this.apiImageService.createImage(data).subscribe({
      next:(data)=>{
      },
      error:(error)=>{
        this.toastrService.error('Thêm hình ảnh chi tiết sản phẩm thất bại');
        console.log(error);
      }
    });
  }

  deleteImage(id:number){
    this.apiImageService.deleteImage(id).subscribe({
      next:(_)=>{},
      error:(error)=>{
        console.log(error);
      }
    });
  }
}
