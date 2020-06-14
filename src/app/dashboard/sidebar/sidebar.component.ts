import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  username: string;
  isAdmin = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.user.subscribe((user) => {
      if (!!user) {
        this.username = user.username;
        this.isAdmin = user.role === 'admin';
      }
    });
  }
}
