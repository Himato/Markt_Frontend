import { environment } from './../../../../environments/environment';
import { Product } from './../../../shared/models/product.models';
import { CategoryService } from './../../../shared/services/category.service';
import { ProductService } from './../../../shared/services/product.service';
import { Brand, Subcategory, Image } from './../../../shared/models/util.models';

import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  @ViewChild('form', { static: false }) form: NgForm;
  @ViewChild('imagesInput', { static: false }) imagesInput: ElementRef;
  brands: Brand[];
  subcategories: Subcategory[];
  product: Product;
  apiUrl: string = environment.baseUrl + 'Images/';
  urls = [];
  images: File[] = [];
  fetching = true;
  submitting = false;
  deleting = false;
  deletingImage = false;
  deletingImageId: number;
  process: string = null;
  error: string = null;

  constructor(
    private productsService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params.id;

      if (!id) {
        this.router.navigate(['/dashboard']);
      }

      this.productsService.getBrands().subscribe((brands) => {
        this.brands = brands;
      });

      this.categoryService.getSubcategories().subscribe((subcategories) => {
        this.subcategories = subcategories;
      });

      this.productsService.getUserProduct(id).subscribe((product: Product) => {
        this.product = product;
        this.fetching = false;
      }, () => {
        this.router.navigate(['/dashboard']);
      });
    });
  }

  onSubmit() {
    this.submitting = true;
    this.productsService.updateProduct(
      this.product,
      this.images
    ).subscribe(() => {
      this.submitting = false;
      this.process = 'Product has been updated';
      this.error = null;
    }, error => {
      this.submitting = false;
      this.process = null;
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

  deleteImage(index: number, id: number) {
    this.deletingImage = true;
    this.deletingImageId = id;
    this.productsService.deleteImage(this.product.id, id).subscribe(
      () => {
        this.product.images.splice(index, 1);
        this.deletingImage = false;
        this.error = null;
      }, error => {
        this.deletingImage = false;
        this.error = error.error.message;
      }
    );
  }

  deleteProduct() {
    const sure = confirm('Do you really want to delete this product? ');
    if (sure) {
      this.deleting = true;
      this.productsService.deleteProduct(this.product.id).subscribe(() => {
        this.deleting = false;
        this.error = null;
        this.router.navigate(['/dashboard']);
      }, error => {
        this.error = error.error.message;
      });
    }
  }
}
