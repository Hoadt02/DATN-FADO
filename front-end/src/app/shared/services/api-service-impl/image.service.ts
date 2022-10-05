import {Injectable} from "@angular/core";
import {ApiImageService} from "../api-services/api-image.service";
import {ToastrService} from "ngx-toastr";
import {ProductDetailsService} from "./product-details.service";

@Injectable({
  providedIn: 'root'
})
export class ImageService{

  constructor(private apiImageService: ApiImageService,
              private toastrService: ToastrService,
              private productDetailService: ProductDetailsService) {
  }

  getAllImage(){
    return this.apiImageService.getAllImage();
  }

  createImage(data:any){
     this.apiImageService.createImage(data).subscribe({
      next:(data)=>{
        console.log(data);
        this.productDetailService.idProductDetail.next(null);
      },
      error:(error)=>{
        this.toastrService.error('Thêm hình ảnh chi tiết sản phẩm thất bại');
        console.log(error);
      }
    });
  }
}
