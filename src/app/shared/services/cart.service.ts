import { CartComponent } from './../../cart/cart.component';
import { Purchase } from './../models/util.models';
import { ProductResult } from './../models/product.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Cart } from '../models/util.models';

@Injectable({ providedIn: 'root' })
export class CartService {
  url = environment.url + 'cart/';

  constructor(private http: HttpClient) { }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.url);
  }

  isLocalCart(): boolean {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return !!cart && cart.length > 0;
  }

  getLocalCart(): Observable<Cart> {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
      return null;
    }

    const newCart = new Cart();
    newCart.totalPrice = 0;
    newCart.purchases = [];

    const requests: Observable<any>[] = [];

    for (const p of cart) {
      requests
        .push(this.http
          .get(this.url.replace('cart', 'products') + `cart?productId=${p.id}`));
    }

    return forkJoin(requests).pipe(map((response: ProductResult[]) => {
      for (const product of response) {
        const purchase = new Purchase();
        const value = cart.find((e: any) => e.id === product.id);
        if (!value) {
          continue;
        }

        purchase.quantity = value.quantity;
        purchase.totalPrice = value.quantity * product.price;
        purchase.product = product;
        newCart.purchases.push(purchase);

        newCart.totalPrice += purchase.totalPrice;
      }

      return newCart;
    }));
  }

  changeCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
      return;
    }

    for (const purchase of cart) {
      this.addToCart(purchase.id, purchase.quantity).subscribe();
    }

    localStorage.removeItem('cart');
  }

  clearCart(): Observable<any> {
    return this.http.delete(this.url);
  }

  checkout(billingAddressId: number): Observable<any> {
    return this.http.put(
      this.url + 'checkout?billingAddressId=' + billingAddressId,
      {}
    );
  }

  addToCart(productId: number, quantity: number): Observable<number> {
    return this.http.post(
      this.url + 'purchase',
      {},
      {
        params: new HttpParams()
          .set('productId', productId.toString())
          .set('quantity', quantity.toString()),
      }
    ).pipe(map((response: any) => {
      return response.value;
    }));
  }

  addToLocalCart(id: number, quantity: number): void {
    let cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
      cart = [];
    }

    const purchase = cart.find((e: any) => e.id === id);

    if (!!purchase) {
      return;
    }

    cart.push({ id, quantity });
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  updatePurchase(purchaseId: number, quantity: number): Observable<any> {
    return this.http.put(
      this.url + 'purchase',
      {},
      {
        params: new HttpParams()
          .set('purchaseId', purchaseId.toString())
          .set('quantity', quantity.toString()),
      }
    );
  }

  updateLocalPurchase(productId: number, quantity: number): void {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
      return;
    }

    const purchase = cart.find((e: any) => e.id === productId);
    purchase.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  deletePurchase(purchaseId: number): Observable<any> {
    return this.http.delete(this.url + 'purchase?purchaseId=' + purchaseId);
  }

  deleteLocalPurchase(productId: number): void {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
      return;
    }

    cart.splice(cart.findIndex((e: any) => e.id === productId), 1);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
