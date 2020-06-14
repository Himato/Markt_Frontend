import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../shared/services/product.service';
import { Brand } from './../../../shared/models/util.models';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {
  @ViewChild('form', { static: false }) form: NgForm;
  brand: Brand;
  fetching = true;
  submitting = false;
  deleting = false;
  process: string = null;
  error: string = null;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params.id;

      if (!id) {
        this.router.navigate(['/dashboard', 'brands']);
      }

      this.productService.getBrand(id).subscribe((brand: Brand) => {
        this.brand = brand;
        this.fetching = false;
      }, () => {
        this.router.navigate(['/dashboard', 'brands']);
      });
    });
  }

  onSubmit() {
    this.submitting = true;
    this.productService.updateBrand(
      this.brand.id,
      this.form.value.name,
    ).subscribe(() => {
      this.submitting = false;
      this.process = 'Brand has been updated';
      this.error = null;
    }, error => {
      this.submitting = false;
      this.process = null;
      this.error = error.error.message;
    });
  }

  onDelete() {
    const sure = confirm('Do you really want to delete this brand? ');
    if (sure) {
      this.deleting = true;
      this.productService.deleteBrand(this.brand.id).subscribe(() => {
        this.deleting = false;
        this.error = null;
        this.router.navigate(['/dashboard', 'brands']);
      }, error => {
        this.error = error.error.message;
      });
    }
  }
}
