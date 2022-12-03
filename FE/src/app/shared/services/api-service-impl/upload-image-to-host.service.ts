import {Injectable} from '@angular/core';
import {ApiUploadImageToHostService} from '../api-services/api-upload-image-to-host.service';
import {ApiConstant} from '../../constants/api-constant';

@Injectable({
  providedIn: 'root'
})
export class UploadImageToHostService {

  constructor(
    private readonly apiUploadImageToHostService: ApiUploadImageToHostService,
  ) {
  }

  uploadImageToHost(files: any) {
    return this.apiUploadImageToHostService.uploadImageToHost(files);
  }
}
