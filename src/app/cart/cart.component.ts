import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { User } from './../shared/models/user.model';
import { CartService } from './../shared/services/cart.service';
import { UserService } from './../shared/services/user.service';
import { Cart, Purchase, Address } from './../shared/models/util.models';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @ViewChild('oldForm', { static: false }) oldForm: NgForm;
  @ViewChild('newForm', { static: false }) newForm: NgForm;
  url = environment.baseUrl + 'Images/';
  cart: Cart;
  addresses: Address[];
  fetching = true;
  checkingout = false;
  addedId: number;
  error: string;
  valid = false;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.addedId = this.activatedRoute.snapshot.queryParams.add;

    this.userService.user.subscribe((user: User) => {
      if (!!user) {
        this.cartService.getCart().subscribe((cart: Cart) => {
          this.cart = cart;
          this.fetchAddresses();
          this.done();
        });
      } else {
        const isLocal = this.cartService.isLocalCart();
        if (isLocal) {
          this.cartService.getLocalCart().subscribe((cart: Cart) => {
            this.cart = cart;
            this.fetchAddresses();
            this.done();
          });
        } else {
          this.done();
        }
      }
    });
  }

  onChangeQty(value: number, purchase: Purchase) {
    if (value <= 0) {
      return;
    }
    purchase.quantity = value;
    this.cart.totalPrice -= purchase.totalPrice;
    purchase.totalPrice = purchase.quantity * purchase.product.price;
    this.cart.totalPrice += purchase.totalPrice;
    this.userService.user.subscribe((user: User) => {
      if (!!user) {
        this.cartService.updatePurchase(purchase.id, value).subscribe();
      } else {
        this.cartService.updateLocalPurchase(purchase.product.id, value);
      }
    });
  }

  onIncrementQty(purchase: Purchase) {
    this.onChangeQty(purchase.quantity + 1, purchase);
  }

  onDecrementQty(purchase: Purchase) {
    this.onChangeQty(purchase.quantity - 1, purchase);
  }

  onDelete(purchase: Purchase) {
    const index = this.cart.purchases.findIndex(p => p.product.id === purchase.product.id);
    this.cart.purchases.splice(index, 1);
    this.cart.totalPrice -= purchase.totalPrice;
    this.userService.user.subscribe((user: User) => {
      if (!!user) {
        this.cartService.deletePurchase(purchase.id).subscribe(() => {
          this.done();
        });
      } else {
        this.cartService.deleteLocalPurchase(purchase.product.id);
        this.done();
      }
    });
  }

  done() {
    this.fetching = false;
    this.validate();
  }

  validate() {
    this.valid = !!this.cart &&
      this.cart.purchases.length > 0 &&
      this.cart.purchases.filter(p => !p.product.isInStock).length === 0;
  }

  fetchAddresses() {
    this.userService.user.subscribe((user: User) => {
      if (!!user) {
        this.userService.getMyAddresses().subscribe((addresses: Address[]) => {
          this.addresses = addresses;
        });
      } else {
        this.addresses = [];
      }
    });
  }

  onCheckout() {
    this.userService.user.subscribe((user: User) => {
      if (!!user) {
        this.checkingout = true;

        if (this.oldForm.value.billingAddressId === 0) {
          this.userService.addAddress(
            this.newForm.value.address,
            this.newForm.value.country,
            this.newForm.value.city,
            this.newForm.value.postCode,
          ).subscribe((id: number) => {
            this.cartService.checkout(id).subscribe(() => {
              this.checkingout = false;
              this.error = null;
              this.router.navigate(['/orders']);
            }, error => {
              this.checkingout = false;
              this.error = error;
            });
          }, error => {
            this.checkingout = false;
            this.error = error;
          });
        } else {
          this.cartService.checkout(this.oldForm.value.billingAddressId).subscribe(() => {
            this.checkingout = false;
            this.error = null;
            this.router.navigate(['/orders']);
          }, error => {
            this.checkingout = false;
            this.error = error.error.message;
          });
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
