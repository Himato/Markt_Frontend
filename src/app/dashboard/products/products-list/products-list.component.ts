import { ProductService } from './../../../shared/services/product.service';
import { environment } from './../../../../environments/environment';
import { Product } from './../../../shared/models/product.models';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  products: Product[];
  url = environment.baseUrl + 'Images/';
  fetching = true;
  id: number;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.id = +this.activatedRoute.snapshot.queryParams.new;
    this.productService.getUserProducts().subscribe((products) => {
      this.products = products;
      this.fetching = false;
    }, () => {
      this.fetching = false;
    });
  }
}
