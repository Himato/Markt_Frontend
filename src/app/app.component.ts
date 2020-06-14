import { UserService } from './shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'App';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.autoLogin();
  }
}
