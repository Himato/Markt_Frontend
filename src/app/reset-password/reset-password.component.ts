import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from './../shared/services/user.service';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  @ViewChild('form', { static: false }) form: NgForm;
  submitting = false;
  error: string = null;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.submitting = true;
    this.userService
      .resetPassword(
        this.form.value.token,
        this.form.value.email,
        this.form.value.password,
        this.form.value.confirmPassword)
      .subscribe(
        () => {
          this.error = null;
          this.form.reset();
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
