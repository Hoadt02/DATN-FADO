<<<<<<< HEAD
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Constants} from "../../../shared/Constants";
=======
import {Component, OnInit} from '@angular/core';
>>>>>>> 6304d023d76156ca9c90f1072ed434295c791b43

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

<<<<<<< HEAD
  readonly TYPE_DIALOG = Constants.TYPE_DIALOG;
  title: string = '';
  formGroup: FormGroup= this.fb.group({
    id: [''],
    product: this.fb.group({
      id: ['']
    }),
    brand: this.fb.group({
      id: ['']
    }),
    material: this.fb.group({
      id: ['']
    }),
    origin: this.fb.group({
      id: [''],
    }),
    name: [''],
    price: [0],
    quantity: [0],
    gender: [''],
    imei: [''],
    avatar: [''],
    createDate: [''],
    description: [''],
    status: [0],
    
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              private dialogRef: MatDialogRef<ProductFormComponent>,
              private fb: FormBuilder) {
=======
  constructor() {
>>>>>>> 6304d023d76156ca9c90f1072ed434295c791b43
  }

  ngOnInit(): void {

  }

  onDismiss() {
    this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE);
  }

  onSubmit() {

  }

  createCategory() {

  }

  createProduct() {

  }

  createBrand() {

  }

  createOrigin() {

  }
}
