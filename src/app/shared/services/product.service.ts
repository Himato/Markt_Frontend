import { SellerProduct, Report } from './../models/product.models';
import { Brand } from './../models/util.models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {
  Product,
  ProductResult,
  SingleProduct,
} from '../models/product.models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  url = environment.url + 'products/';

  constructor(private http: HttpClient) { }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.url + 'reports');
  }

  getHomeProducts(
    query?: string,
    offset?: number,
    limit?: number
  ): Observable<ProductResult[]> {
    let params = new HttpParams();

    if (!!query) {
      params = params.append('query', `name co ${query}`);
    }

    if (!!offset) {
      params = params.append('offset', offset.toString());
    }

    if (!!limit) {
      params = params.append('limit', limit.toString());
    }

    return this.http.get<ProductResult[]>(
      this.url + 'home',
      { params }
    );
  }

  getProducts(
    subcategoryUri: string,
    brands?: string,
    query?: string,
    offset?: number,
    limit?: number
  ): Observable<ProductResult[]> {
    let params = new HttpParams();

    if (!brands) {
      brands = ' ';
    }

    if (!!query) {
      params = params.append('query', `name co ${query}`);
    }

    if (!!offset) {
      params = params.append('offset', offset.toString());
    }

    if (!!limit) {
      params = params.append('limit', limit.toString());
    }

    return this.http.get<ProductResult[]>(
      this.url + `subcategory/${subcategoryUri}/${brands}/`,
      { params }
    );
  }

  getSellerProducts(username: string): Observable<SellerProduct> {
    return this.http.get<SellerProduct>(this.url + `Seller/${username}`);
  }

  getProduct(productUri: string): Observable<SingleProduct> {
    return this.http.get<SingleProduct>(this.url + productUri);
  }

  getBrands(uri: string): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.url + 'brands?subcategoryUri=' + uri);
  }

  getAdminBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.url + 'brands/admin');
  }

  getBrand(id: number): Observable<Brand> {
    return this.http.get<Brand>(this.url + 'brands/admin?id=' + id);
  }

  addBrand(name: string): Observable<number> {
    return this.http
      .post(this.url + 'brands/admin', { name })
      .pipe(map((response: any) => {
        return response.value;
      }));
  }

  updateBrand(brandId: number, name: string) {
    return this.http.put(this.url + `brands/admin?id=${brandId}`, { name });
  }

  deleteBrand(brandId: number) {
    return this.http.delete(this.url + `brands/admin?id=${brandId}`);
  }

  getUserProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  getUserProduct(id: number): Observable<Product> {
    id = !!id ? id : 0;
    return this.http.get<Product>(`${this.url}?id=${id}`);
  }

  addReview(productId: number, rate: number): Observable<number> {
    return this.http
      .post(this.url + `review?productId=${productId}&rate=${rate}`, {})
      .pipe(map((response: any) => {
        return response.value;
      }));
  }

  updateReview(reviewId: number, rate: number) {
    return this.http
      .put(this.url + `review?reviewId=${reviewId}&rate=${rate}`, {});
  }

  addProduct(
    name: string,
    description: string,
    specification: string,
    returnInfo: string,
    price: number,
    isInStock: boolean,
    subcategoryId: number,
    brandId: number,
    images: File[]
  ): Observable<number> {
    const form = new FormData();

    form.append('name', name);
    form.append('description', description);
    form.append('specification', specification);
    form.append('returnInfo', returnInfo);
    form.append('price', price.toString());
    form.append('isInStock', isInStock.toString());
    form.append('subcategoryId', subcategoryId.toString());
    form.append('brandId', brandId.toString());

    for (const image of images) {
      form.append('images', image);
    }

    return this.http.post(this.url, form).pipe(map((response: any) => {
      return response.value;
    }));
  }

  updateProduct(product: Product, images: File[]) {
    const form = new FormData();

    form.append('name', product.name);
    form.append('description', product.description);
    form.append('specification', product.specification);
    form.append('returnInfo', product.returnInfo);
    form.append('price', product.price.toString());
    form.append('isInStock', product.isInStock.toString());
    form.append('subcategoryId', product.subcategoryId.toString());
    form.append('brandId', product.brandId.toString());

    for (const image of images) {
      form.append('images', image);
    }

    return this.http.put(`${this.url}?id=${product.id}`, form);
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.url}?id=${productId}`);
  }

  deleteImage(productId: number, imageId: number) {
    return this.http.delete(this.url + `images?productId=${productId}&imageId=${imageId}`);
  }
}
