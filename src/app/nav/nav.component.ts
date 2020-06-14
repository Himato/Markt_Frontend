import { Component, OnInit } from '@angular/core';

import { UserService } from './../shared/services/user.service';
import { CategoryService } from './../shared/services/category.service';
import { Category } from './../shared/models/util.models';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  categories: Category[];
  logged = false;
  upgraded = false;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService
  ) {
    this.categoryService.categories.subscribe((categories) => {
      this.categories = categories;
    });
  }

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      this.logged = !!user;
      this.upgraded = !!user && !!user.role;
    });
  }

  onLogout() {
    this.userService.logout();
  }
}
