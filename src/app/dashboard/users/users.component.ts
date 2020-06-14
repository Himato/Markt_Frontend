import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserReport } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: UserReport[];
  fetching = true;
  id: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserReports().subscribe((users: UserReport[]) => {
      this.users = users;
      this.fetching = false;
    }, () => {
      this.fetching = false;
    });
  }

}
