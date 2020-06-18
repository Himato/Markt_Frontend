import { environment } from './../../environments/environment';
import { ProductResult } from './../shared/models/product.models';
import { ProductService } from './../shared/services/product.service';
import { CategoryService } from './../shared/services/category.service';
import { Category } from './../shared/models/util.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url = environment.baseUrl + 'Images/';
  categories: Category[];
  fetching = true;
  error: string;
  products: ProductResult[];
  offset = 0;
  times = 0;

  constructor(
    private categoryService: CategoryService,
    private productsService: ProductService,
  ) { }

  ngOnInit() {
    this.categoryService.categories.subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.getProducts();
  }

  onNext() {
    this.times += 1;
    this.getProducts();
  }

  onPrevious() {
    this.offset -= 2;
    this.times -= 1;
    this.getProducts();
  }

  getProducts(query?: string) {
    this.offset = this.offset > 0 ? this.offset : 0;
    this.fetching = true;
    this.productsService.getHomeProducts(query, this.offset++ * 24).subscribe((products: ProductResult[]) => {
      this.products = products;
      this.fetching = false;
    }, error => {
      this.error = error.error.message;
      this.fetching = false;
    });
  }

  search(value: string) {
    this.offset = 0;
    this.getProducts(value);
  }
}
