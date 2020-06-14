import { User } from './../shared/models/user.model';
import { UserService } from './../shared/services/user.service';
import { environment } from './../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from './../shared/services/cart.service';
import { ProductService } from './../shared/services/product.service';
import { SingleProduct, Review } from './../shared/models/product.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  url = environment.baseUrl + 'Images/';
  product: SingleProduct;
  fetching = true;
  quantity = 1;
  defaultImage = 0;
  reviewError: string = null;
  reviewLoading = false;

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.fetching = true;
      const uri = params.uri;

      if (!uri) {
        this.router.navigate(['/notfound']);
        return;
      }

      this.productService.getProduct(uri).subscribe((product: SingleProduct) => {
        this.product = product;
        this.fetching = false;
      }, error => {
        if (error.status === 404) {
          this.router.navigate(['/notfound']);
        }
        this.fetching = false;
      });
    });
  }

  addToCart() {
    this.userService.user.subscribe((user: User) => {
      if (!!user) {
        this.cartService.addToCart(this.product.id, this.quantity).subscribe(() => {
          this.router.navigate(['/cart'], { queryParams: { add: this.product.id } });
        });
      } else {
        this.cartService.addToLocalCart(this.product.id, this.quantity);
        this.router.navigate(['/cart'], { queryParams: { add: this.product.id } });
      }
    });
  }

  onChangeQty(value: number) {
    if (value <= 0) {
      return;
    }
    this.quantity = value;
  }

  onIncrementQty() {
    this.onChangeQty(this.quantity + 1);
  }

  onDecrementQty() {
    this.onChangeQty(this.quantity - 1);
  }

  array(n: number) {
    return Array(Math.round(n));
  }

  imageClick(index: number) {
    this.defaultImage = index;
  }

  onReview(rate: number) {
    rate = rate + 1;

    this.reviewLoading = true;

    if (!this.product.userReview) {
      this.productService.addReview(this.product.id, rate).subscribe((reviewId: number) => {
        this.reviewError = null;
        this.reviewLoading = false;

        const review = new Review();
        review.id = reviewId;
        review.rate = rate;

        this.product.userReview = review;

        const oldNumber = this.product.numberOfReviews;
        this.product.numberOfReviews++;
        this.product.review *= (oldNumber / this.product.numberOfReviews);
        this.product.review += (rate / this.product.numberOfReviews);
      }, (error: any) => {
        this.reviewLoading = false;
        this.reviewError = error.error.message;
      });
    } else {
      this.productService.updateReview(this.product.userReview.id, rate).subscribe(() => {
        this.reviewError = null;
        this.reviewLoading = false;

        this.product.review -= (this.product.userReview.rate / this.product.numberOfReviews);
        this.product.review += (rate / this.product.numberOfReviews);
        this.product.userReview.rate = rate;
      }, (error: any) => {
        this.reviewLoading = false;
        this.reviewError = error.error.message;
      });
    }
  }
}
