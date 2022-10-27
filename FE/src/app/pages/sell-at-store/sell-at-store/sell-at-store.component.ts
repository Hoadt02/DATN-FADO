import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProductDetailsService} from "../../../shared/services/api-service-impl/product-details.service";

@Component({
  selector: 'app-sell-at-store',
  templateUrl: './sell-at-store.component.html',
  styleUrls: ['./sell-at-store.component.scss']
})
export class SellAtStoreComponent implements OnInit {

  tabs = ['First'];
  selected = new FormControl(0);

  products = [];
  filterProduct;

  formGroup: FormGroup;

  constructor(private productDetailService: ProductDetailsService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getAllNameProduct();
  }

  getAllNameProduct() {
    this.productDetailService.getAllProductDetail().subscribe((data: any) => {
      this.products = data;
      this.filterProduct = data;
    })
  }

  initForm() {
    this.formGroup = this.fb.group({
      name : [''],
    })
    this.formGroup.get('name').valueChanges.subscribe((data: any) => {
      console.log('data is: ', data);
      this.onChangeSearch(data);
    })
  }

  onChangeSearch(search) {
    // this.filterProduct = this.products.filter(item => {
    //   return item.toString().toLowerCase().indexOf(search.toLowerCase()) > -1;
    // })
    this.productDetailService.findProductByName(search).subscribe((data: any) => {
      this.filterProduct = data;
    })
  }

  addTab(selectAfterAdding: boolean) {
    this.tabs.push(`Link ${this.tabs.length + 1}`);
    this.selected.setValue(this.tabs.length - 1);
  }

  removeTab(index: number) {
    if (this.tabs.length > 1) {
      this.tabs.splice(index, 1);
    }
  }
}
