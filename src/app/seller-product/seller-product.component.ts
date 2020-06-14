import { ActivatedRoute, Router } from '@angular/router';
import { ProductResult, SellerProduct } from './../shared/models/product.models';
import { ProductService } from './../shared/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-product',
  templateUrl: './seller-product.component.html',
  styleUrls: ['./seller-product.component.css']
})
export class SellerProductComponent implements OnInit {
  sellerName: string;
  products: ProductResult[];
  fetching = true;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const username = this.activatedRoute.snapshot.params.username;

    if (!username) {
      this.router.navigate(['notfound']);
    }

    this.productService.getSellerProducts(username).subscribe((sellerProduct: SellerProduct) => {
      this.sellerName = sellerProduct.sellerName;
      this.products = sellerProduct.products;
      this.fetching = false;
    }, (error: any) => {
      if (error.status === 404) {
        this.router.navigate(['/notfound']);
      }
      this.fetching = false;
    });
  }

}
