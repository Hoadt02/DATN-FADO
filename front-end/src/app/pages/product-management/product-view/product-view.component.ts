import {Component, Inject, OnInit} from '@angular/core';
import {Constants} from "../../../shared/Constants";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ImageService} from "../../../shared/services/api-service-impl/image.service";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  listImg:any[] = [];
  linkSrcImg:string = 'assets/img/avtProduct/' + this.data.avatar;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ProductViewComponent>,
              private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.getImagesByIdProductDetail(this.data.id).subscribe(data=>{
      if (data){
        this.listImg = data;
      }
    });
  }

  onDismiss() {
    this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE);
  }

  onClickChangeImg(type:number, data:string){
    if (type == 0){
      this.linkSrcImg = 'assets/img/avtProduct/' + data;
    }else {
      this.linkSrcImg = 'assets/img/imgDetailProduct/' + data;
    }
  }

}
