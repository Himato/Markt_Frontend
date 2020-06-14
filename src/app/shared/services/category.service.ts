import { Category, Subcategory, AdminCategory, AdminSubcategories } from './../models/util.models';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  categories = new BehaviorSubject<Category[]>(null);
  url = environment.url + 'categories/';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url)
      .pipe(tap((response: Category[]) => {
        this.categories.next(response);
      }));
  }

  getAdminCategories(): Observable<AdminCategory[]> {
    return this.http.get<AdminCategory[]>(this.url + 'admin');
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.url + 'admin?id=' + id);
  }

  addCategory(name: string): Observable<number> {
    return this.http
      .post(this.url + 'admin', { name })
      .pipe(map((response: any) => {
        return response.value;
      }));
  }

  updateCategory(id: number, name: string) {
    return this.http.put(this.url + 'admin?id=' + id, { name });
  }

  deleteCategory(id: number) {
    return this.http.delete(this.url + 'admin?id=' + id);
  }

  getSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(this.url + 'subcategories');
  }

  getAdminSubcategories(): Observable<AdminSubcategories[]> {
    return this.http.get<AdminSubcategories[]>(this.url + 'subcategories/admin');
  }

  getSubcategory(id: number): Observable<Subcategory> {
    return this.http.get<Subcategory>(this.url + 'subcategories/admin?id=' + id);
  }

  addSubcategory(categoryId: number, name: string): Observable<number> {
    return this.http
      .post(this.url + 'subcategories/admin', { name, categoryId })
      .pipe(map((response: any) => {
        return response.value;
      }));
  }

  updateSubcategory(id: number, categoryId: number, name: string) {
    return this.http.put(this.url + 'subcategories/admin?id=' + id, {
      name,
      categoryId,
    });
  }

  deleteSubcategory(id: number) {
    return this.http.delete(this.url + 'subcategories/admin?id=' + id);
  }
}
