import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../shared/services/api-service-impl/category.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constants} from '../../../shared/Constants';
import {ToastrService} from 'ngx-toastr';
import {checkSpace} from '../../../shared/validator/validatorForm';
import {Regex} from '../../../shared/validator/regex';
import {UploadImageService} from "../../../shared/services/api-service-impl/upload-image.service";
import {error} from "protractor";
import {BehaviorSubject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoading: boolean = true;
  title: string;
  fileImg: File[] = [];
  showImage = true;

  formGroup: FormGroup = this.fb.group({
    id: '',
    name: ['', [checkSpace, Validators.pattern(Regex.name), Validators.maxLength(255)]],
    image: '',
    status: [1]
  })

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private toastrService: ToastrService,
              private matDialogRef: MatDialogRef<CategoryFormComponent>,
              private uploadImageService: UploadImageService,
              @Inject(MAT_DIALOG_DATA) private dataDiaLog?: any) {
  }

  ngOnInit(): void {
    this.setTitleForm();
  }

  getAll() {
    this.categoryService.getAll().subscribe({
      next: (data: any) => {
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.toastrService.warning('Lỗi load dữ liệu!');
      }
    });
  }

  setTitleForm() {
    // tslint:disable-next-line:triple-equals
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.title = 'Thêm mới danh mục';
    } else {
      this.title = 'Chỉnh sửa danh mục';
      this.formGroup.patchValue(this.dataDiaLog.row)
    }
  }

  onSelectImg(event) {
    if (this.fileImg.length >= 1) {
      this.fileImg.splice(0, this.fileImg.length);
    }
    this.fileImg = event.addedFiles;
  }

  onRemoveImg() {
    console.log(this.fileImg.length);
    this.fileImg.splice(0, 1);
  }

  onDismiss() {
    this.matDialogRef.close();
  }

  onSubmit() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    // tslint:disable-next-line:triple-equals

    // add image
    const imgData = new FormData();
    imgData.append('file', this.fileImg[0]);
    this.uploadImageService.uploadImage(imgData, 'imageProduct').subscribe((data) => {
      this.formGroup.patchValue({image: data.name});
      this.isCloseDialog.next(true);
    }, error => {
      console.log(error);
      this.toastrService.error('Lỗi thêm ảnh !!');
      return;
    })
    this.isCloseDialog.subscribe(
      data => {
        if (data) {
          if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
            this.categoryService.create(this.formGroup.getRawValue());
            this.getAll();
            this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
          } else {
            this.categoryService.update(this.formGroup.getRawValue());
            this.getAll();
            this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
          }
        }
      }
    )
  }
}
