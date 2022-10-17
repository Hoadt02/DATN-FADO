import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../shared/service/api-service-impl/category.service";
import {ProductService} from "../../shared/service/api-service-impl/product.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: any[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.getAll().subscribe((data: any) => {
      this.categories = data as any[];
    });
  }
}
