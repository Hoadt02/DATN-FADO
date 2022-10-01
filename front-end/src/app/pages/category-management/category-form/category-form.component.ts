import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {CategoryService} from '../../../shared/services/api-service-impl/category.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constants} from '../../../shared/Constants';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  title: string;

  constructor(private fb: FormBuilder,
              private categoryService: CategoryService,
              private matDialogRef: MatDialogRef<CategoryFormComponent>,
              @Inject(MAT_DIALOG_DATA) private dataDiaLog?: any) { }

  ngOnInit(): void {
    this.setTitleForm();
  }

  setTitleForm() {
    // tslint:disable-next-line:triple-equals
    if (this.dataDiaLog.type == Constants.TYPE_DIALOG.NEW) {
      this.title = 'Thêm mới danh mục';
    } else {
      this.title = 'Chỉnh sửa danh mục';
    }
  }

  onDismiss() {
    this.matDialogRef.close();
  }

  onSubmit() {
    console.log(123123123123)
  }
}
