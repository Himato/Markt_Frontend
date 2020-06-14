import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from './../shared/services/user.service';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  @ViewChild('form', { static: false }) form: NgForm;
  submitting = false;
  error: string = null;

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.submitting = true;
    this.userService
      .forgetPassword(this.form.value.email)
      .subscribe(
        () => {
          this.error = null;
          this.form.reset();
          this.router.navigate(['/resetPassword']);
          this.submitting = false;
        },
        (error) => {
          this.error = error.error.message;
          this.submitting = false;
        }
      );
  }
}
