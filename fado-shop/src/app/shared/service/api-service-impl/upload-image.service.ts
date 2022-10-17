import {Injectable} from "@angular/core";
import {ApiUploadService} from "../api-services/api-upload.service";

@Injectable({
  providedIn: 'root'
})
export class UploadImageService{

  constructor(private apiUploadService: ApiUploadService) {
  }

  uploadImage(data:any, folder:string){
    return this.apiUploadService.uploadImage(data, folder);
  }

  uploadImageDetail(data: any, folder:string) {
    return this.apiUploadService.upLoadImageDetail(data, folder);
  }
}
