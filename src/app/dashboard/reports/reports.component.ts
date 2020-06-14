import { ProductService } from './../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/shared/models/product.models';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reports: Report[];
  fetching = true;
  id: number;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getReports().subscribe((reports: Report[]) => {
      this.reports = reports;
      this.fetching = false;
    }, () => {
      this.fetching = false;
    });
  }

}
