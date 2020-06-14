import { UserService } from './../../shared/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private userService: UserService) { }

  onLogout() {
    this.userService.logout();
  }
}
