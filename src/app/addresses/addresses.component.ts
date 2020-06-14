import { Address } from './../shared/models/util.models';
import { UserService } from './../shared/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
  addresses: Address[];
  fetching = true;
  error: string = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMyAddresses().subscribe((addresses: Address[]) => {
      this.addresses = addresses;
      this.error = null;
      this.fetching = false;
    }, (error: any) => {
      this.error = error.error.message;
      this.fetching = false;
    });
  }
}
