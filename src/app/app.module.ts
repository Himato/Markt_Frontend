import { DashboardModule } from './dashboard/dashboard.module';
import { AuthInterceptorService } from './shared/interceptors/auth-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { BaseComponent } from './base/base.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { ProductResultComponent } from './product-result/product-result.component';
import { ProductResultListComponent } from './product-result-list/product-result-list.component';
import { SellerProductComponent } from './seller-product/seller-product.component';
import { OrdersComponent } from './orders/orders.component';
import { AddressesComponent } from './addresses/addresses.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { PolicyComponent } from './policy/policy.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    CartComponent,
    PageNotFoundComponent,
    ProductComponent,
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    UpgradeComponent,
    BaseComponent,
    SubcategoryComponent,
    ProductResultComponent,
    ProductResultListComponent,
    SellerProductComponent,
    OrdersComponent,
    AddressesComponent,
    SettingsComponent,
    AboutComponent,
    PolicyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
