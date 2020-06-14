import { Router } from '@angular/router';
import { UserService } from './../shared/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent {
  submitting = false;
  error: string = null;

  constructor(private userService: UserService, private router: Router) {}

  onUpgrade() {
    this.submitting = true;
    this.userService
      .upgrade()
      .subscribe(
        () => {
          this.error = null;
          this.router.navigate(['/dashboard']);
          this.submitting = false;
        },
        (error) => {
          this.error = error.error.message;
          this.submitting = false;
        }
      );
  }
}
