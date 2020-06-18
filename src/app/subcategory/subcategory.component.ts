import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { ProductResult } from './../shared/models/product.models';
import { ProductService } from './../shared/services/product.service';
import { CategoryService } from './../shared/services/category.service';
import { Category, Brand } from './../shared/models/util.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  categories: Category[];
  brands: Brand[];
  fetching = true;
  error: string = null;
  products: ProductResult[];
  offset = 0;
  uri: string;

  constructor(
    private categoryService: CategoryService,
    private productsService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoryService.categories.subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    this.activatedRoute.params.subscribe((params) => {
      const uri = params.uri;

      if (!uri) {
        this.router.navigate(['/notfound']);
      }

      this.uri = uri;
      this.offset = 0;

      this.productsService.getBrands(uri).subscribe((brands: Brand[]) => {
        this.brands = brands;
      });

      this.getProducts();
    });
  }

  onNext() {
    this.getProducts();
  }

  onPrevious() {
    this.offset -= 2;
    this.getProducts();
  }

  getProducts(brands?: string, query?: string) {
    this.offset = this.offset > 0 ? this.offset : 0;
    this.fetching = true;

    this.productsService.getProducts(this.uri, brands, query, this.offset++ * 25)
      .subscribe((products: ProductResult[]) => {
        this.products = products;
        this.fetching = false;
      }, error => {
        if (error.status === 404) {
          this.router.navigate(['/notfound']);
        } else {
          this.error = error.error.message;
        }
        this.fetching = false;
      });
  }

  filter(brand: string) {
    this.offset = 0;
    this.getProducts(brand);
  }

  search(value: string) {
    this.offset = 0;
    this.getProducts(null, value);
  }
}
