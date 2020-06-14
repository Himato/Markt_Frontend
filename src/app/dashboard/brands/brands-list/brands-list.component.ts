import { ProductService } from './../../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { AdminBrand } from './../../../shared/models/util.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit {
  brands: AdminBrand[];
  fetching = true;
  id: number;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.queryParams.new;
    this.productService.getAdminBrands().subscribe((brands: AdminBrand[]) => {
      this.brands = brands;
      this.fetching = false;
    }, () => {
      this.fetching = false;
    });
  }

}
