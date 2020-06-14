import { PolicyComponent } from './policy/policy.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { SellerGuard } from './shared/guards/seller.guard';
import { NonAuthGuard } from './shared/guards/non-auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';
import { SellerProductComponent } from './seller-product/seller-product.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { CategoriesResolverService } from './shared/resolvers/categories-resolver.service';
import { BaseComponent } from './base/base.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './register/register.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate: [SellerGuard]
  },
  {
    path: '',
    component: BaseComponent,
    resolve: [CategoriesResolverService],
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: '', children: [
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
          { path: 'resetPassword', component: ResetPasswordComponent },
          { path: 'forgetPassword', component: ForgetPasswordComponent },
        ],
        canActivate: [NonAuthGuard]
      },
      {
        path: '', children: [
          { path: 'orders', component: OrdersComponent },
          { path: 'addresses', component: AddressesComponent },
          { path: 'settings', component: SettingsComponent },
        ],
        canActivate: [AuthGuard]
      },
      { path: 'cart', component: CartComponent },
      { path: 'upgrade', component: UpgradeComponent },
      { path: 'subcategory/:uri', component: SubcategoryComponent },
      { path: 'seller/:username', component: SellerProductComponent },
      { path: 'products/:uri', component: ProductComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'policy', component: PolicyComponent },
      { path: 'notfound', component: PageNotFoundComponent },
      { path: '**', component: PageNotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
