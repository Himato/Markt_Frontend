import { BrandsListComponent } from './brands/brands-list/brands-list.component';
import { SubcategoriesListComponent } from './subcategories/subcategories-list/subcategories-list.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { AdminGuard } from './../shared/guards/admin.guard';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { FormsModule } from '@angular/forms';
import { NewProductComponent } from './products/new-product/new-product.component';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ReportsComponent } from './reports/reports.component';
import { CategoriesComponent } from './categories/categories.component';
import { SubcategoriesComponent } from './subcategories/subcategories.component';
import { BrandsComponent } from './brands/brands.component';
import { NewCategoryComponent } from './categories/new-category/new-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { NewSubcategoryComponent } from './subcategories/new-subcategory/new-subcategory.component';
import { EditSubcategoryComponent } from './subcategories/edit-subcategory/edit-subcategory.component';
import { NewBrandComponent } from './brands/new-brand/new-brand.component';
import { EditBrandComponent } from './brands/edit-brand/edit-brand.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: '',
            component: ProductsComponent,
            children: [
              { path: '', component: ProductsListComponent },
              { path: 'new', component: NewProductComponent },
              { path: 'edit/:id', component: EditProductComponent },
            ]
          },
          { path: 'reports', component: ReportsComponent },
          { path: 'users', component: UsersComponent },
          {
            path: '',
            canActivate: [AdminGuard],
            children: [
              {
                path: 'categories', component: CategoriesComponent,
                children: [
                  { path: '', component: CategoriesListComponent },
                  { path: 'new', component: NewCategoryComponent },
                  { path: 'edit/:id', component: EditCategoryComponent },
                ]
              },
              {
                path: 'subcategories', component: SubcategoriesComponent,
                children: [
                  { path: '', component: SubcategoriesListComponent },
                  { path: 'new', component: NewSubcategoryComponent },
                  { path: 'edit/:id', component: EditSubcategoryComponent },
                ]
              },
              {
                path: 'brands', component: BrandsComponent,
                children: [
                  { path: '', component: BrandsListComponent },
                  { path: 'new', component: NewBrandComponent },
                  { path: 'edit/:id', component: EditBrandComponent },
                ]
              },
            ]
          },
          { path: 'notfound', component: PageNotFoundComponent },
          { path: '**', component: PageNotFoundComponent },
        ],
      },
    ]),
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    ProductsListComponent,
    NewProductComponent,
    EditProductComponent,
    ProductsComponent,
    ReportsComponent,
    CategoriesComponent,
    CategoriesListComponent,
    SubcategoriesComponent,
    SubcategoriesListComponent,
    BrandsComponent,
    BrandsListComponent,
    NewCategoryComponent,
    EditCategoryComponent,
    NewSubcategoryComponent,
    EditSubcategoryComponent,
    NewBrandComponent,
    EditBrandComponent,
    UsersComponent
  ],
})
export class DashboardModule { }
