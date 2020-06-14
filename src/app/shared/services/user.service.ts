import { CartService } from './cart.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../../environments/environment';
import { User, UserReport } from '../models/user.model';
import { Order, Address } from '../models/util.models';

@Injectable({ providedIn: 'root' })
export class UserService {
  user = new BehaviorSubject<User>(null);
  url = environment.url + 'account/';
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private router: Router
  ) { }

  getUserReports(): Observable<UserReport[]> {
    return this.http.get<UserReport[]>(this.url + 'users');
  }

  register(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<string> {
    return this.http
      .post(this.url + 'register', {
        username,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      })
      .pipe(
        tap((response: any) => {
          this.authenticate(response.value);
        }),
        map((response: any) => {
          return response.value;
        })
      );
  }

  login(email: string, password: string): Observable<string> {
    return this.http
      .post(this.url + 'login', {
        email,
        password,
      })
      .pipe(
        tap((response: any) => {
          this.authenticate(response.value);
          this.cartService.changeCart();
        }),
        map((response: any) => {
          return response.value;
        }),
        catchError(err => {
          if (err.status === 401) {
            err.error = { message: 'Invalid login attempt' };
          }

          return throwError(err);
        })
      );
  }

  autoLogin(): void {
    const token = localStorage.getItem('userToken');

    if (!token) {
      return;
    }

    this.authenticate(token);
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout(): void {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userToken');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private authenticate(token: string): void {
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(token);
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);

    if (isExpired) {
      return;
    }

    const user = new User(
      decodedToken.nameIdentifier,
      decodedToken.email,
      decodedToken.name,
      typeof (decodedToken.Role) !== 'undefined' ?
        decodedToken.Role.toLowerCase() : null,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expirationDate.getTime() - new Date().getTime());
    localStorage.setItem('userToken', token);
  }

  forgetPassword(email: string): Observable<boolean> {
    return this.http.post(this.url + 'forgetPassword', { email }).pipe(
      map(() => {
        return true;
      })
    );
  }

  resetPassword(
    token: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Observable<string> {
    return this.http
      .post(this.url + 'resetPassword', {
        token,
        email,
        password,
        confirmPassword,
      })
      .pipe(
        tap((response: any) => {
          this.authenticate(response.value);
        }),
        map((response: any) => {
          return response.value;
        })
      );
  }

  updateEmail(email: string): Observable<string> {
    return this.http
      .put(this.url + 'updateEmail', { email })
      .pipe(
        tap((response: any) => {
          this.authenticate(response.value);
          this.cartService.changeCart();
        }),
        map((response: any) => {
          return response.value;
        }));
  }

  updatePassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Observable<string> {
    return this.http.put(this.url + 'updatePassword', {
      currentPassword,
      newPassword,
      confirmPassword,
    })
      .pipe(
        tap((response: any) => {
          this.authenticate(response.value);
          this.cartService.changeCart();
        }),
        map((response: any) => {
          return response.value;
        }));
  }

  upgrade(): Observable<string> {
    return this.http.put(this.url + 'upgrade', {}).pipe(
      tap((response: any) => {
        this.authenticate(response.value);
      }),
      map((response: any) => {
        return response.value;
      }),
      catchError((err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
          err.error = { message: 'You have to login first' };
        }

        return throwError(err);
      })
    );
  }

  addAddress(
    address: string,
    country: string,
    city: string,
    postCode: string
  ): Observable<number> {
    return this.http
      .post(this.url + 'address', {
        address,
        city,
        country,
        postCode,
      })
      .pipe(
        map((response: any) => {
          return response.value;
        })
      );
  }

  getMyOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url + 'myOrders');
  }

  getMyAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.url + 'myAddresses');
  }
}
