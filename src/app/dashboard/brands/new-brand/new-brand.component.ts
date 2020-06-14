import { Router } from '@angular/router';
import { ProductService } from './../../../shared/services/product.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-brand',
  templateUrl: './new-brand.component.html',
  styleUrls: ['./new-brand.component.css']
})
export class NewBrandComponent {
  @ViewChild('form', { static: false }) form: NgForm;
  submitting = false;
  error: string = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  onSubmit() {
    this.submitting = true;
    this.productService.addBrand(
      this.form.value.name,
    ).subscribe((id: number) => {
      this.error = null;
      this.submitting = false;
      this.router.navigate(['/dashboard', 'brands'], { queryParams: { new: id } });
    }, error => {
      this.submitting = false;
      this.error = error.error.message;
    });
  }
}
