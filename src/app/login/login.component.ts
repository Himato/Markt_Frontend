import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from './../shared/services/user.service';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('loginForm', { static: false }) loginForm: NgForm;
  submitting = false;
  error: string = null;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.submitting = true;
    this.userService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        () => {
          this.error = null;
          this.loginForm.reset();
          this.router.navigate(['/']);
          this.submitting = false;
        },
        (error) => {
          this.error = error.error.message;
          this.submitting = false;
        }
      );
  }
}
