import { CategoryService } from './../../../shared/services/category.service';
import { ProductService } from './../../../shared/services/product.service';
import { Brand, Subcategory } from './../../../shared/models/util.models';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  @ViewChild('form', { static: false }) form: NgForm;
  @ViewChild('imagesInput', { static: false }) imagesInput: ElementRef;
  brands: Brand[];
  subcategories: Subcategory[];
  urls = [];
  images: File[] = [];
  submitting = false;
  error: string = null;

  constructor(
    private productsService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productsService.getBrands().subscribe((brands) => {
      this.brands = brands;
    });

    this.categoryService.getSubcategories().subscribe((subcategories) => {
      this.subcategories = subcategories;
    });
  }

  onSubmit() {
    this.submitting = true;
    this.productsService.addProduct(
      this.form.value.name,
      this.form.value.description,
      this.form.value.specification,
      this.form.value.returnInfo,
      this.form.value.price,
      this.form.value.isInStock,
      +this.form.value.subcategoryId,
      +this.form.value.brandId,
      this.images
    ).subscribe((id: number) => {
      this.error = null;
      this.submitting = false;
      this.router.navigate(['/dashboard'], { queryParams: { new: id } });
    }, error => {
      this.submitting = false;
      this.error = error.error.message;
    });
  }

  onSelectFile(images: FileList) {
    if (images && images[0]) {
      const filesAmount = images.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        reader.onload = (e) => {
          this.urls.push(e.target.result);
        };

        reader.readAsDataURL(images[i]);

        this.images.push(images[i]);
      }
    }
  }

  removeImage(index: number) {
    this.urls.splice(index, 1);
    this.images.splice(index, 1);

    if (this.images.length === 0) {
      this.imagesInput.nativeElement.value = null;
    }
  }
}
