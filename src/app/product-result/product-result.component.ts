import { environment } from './../../environments/environment';
import { User } from './../shared/models/user.model';
import { Router } from '@angular/router';
import { CartService } from './../shared/services/cart.service';
import { UserService } from './../shared/services/user.service';
import { ProductResult } from './../shared/models/product.models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-result',
  templateUrl: './product-result.component.html',
  styleUrls: ['./product-result.component.css']
})
export class ProductResultComponent {
  @Input() product: ProductResult;
  url = environment.baseUrl + 'Images/';

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private router: Router
  ) { }

  addToCart() {
    this.userService.user.subscribe((user: User) => {
      if (!!user) {
        this.cartService.addToCart(this.product.id, 1).subscribe(() => {
          this.router.navigate(['/cart'], { queryParams: { add: this.product.id } });
        });
      } else {
        this.cartService.addToLocalCart(this.product.id, 1);
        this.router.navigate(['/cart'], { queryParams: { add: this.product.id } });
      }
    });
  }
}
