import { UserService } from './../shared/services/user.service';
import { Order } from './../shared/models/util.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  fetching = true;
  error: string = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMyOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
      this.error = null;
      this.fetching = false;
    }, (error: any) => {
      this.error = error.error.message;
      this.fetching = false;
    });
  }
}
