import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('registerForm', { static: false }) registerForm: NgForm;
  error: string = null;
  submitting = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.submitting = true;
    this.userService
      .register(
        this.registerForm.value.username,
        this.registerForm.value.firstName,
        this.registerForm.value.lastName,
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.confirmPassword
      )
      .subscribe(
        () => {
          this.error = null;
          this.registerForm.reset();
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
