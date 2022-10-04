import {Injectable} from "@angular/core";
import {ApiUploadService} from "../api-services/api-upload.service";
import {error} from "protractor";

@Injectable({
  providedIn: 'root'
})
export class UploadImageService{

  constructor(private apiUploadService: ApiUploadService) {
  }

  uploadImage(data:any, folder:string){
    this.apiUploadService.uploadImage(data, folder).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
