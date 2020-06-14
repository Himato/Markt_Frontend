import { Category } from './../../../shared/models/util.models';
import { Router } from '@angular/router';
import { CategoryService } from './../../../shared/services/category.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-subcategory',
  templateUrl: './new-subcategory.component.html',
  styleUrls: ['./new-subcategory.component.css']
})
export class NewSubcategoryComponent implements OnInit {
  @ViewChild('form', { static: false }) form: NgForm;
  categories: Category[];
  submitting = false;
  error: string = null;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    this.submitting = true;
    this.categoryService.addSubcategory(
      this.form.value.categoryId,
      this.form.value.name,
    ).subscribe((id: number) => {
      this.error = null;
      this.submitting = false;
      this.router.navigate(['/dashboard', 'subcategories'], { queryParams: { new: id } });
    }, error => {
      this.submitting = false;
      this.error = error.error.message;
    });
  }
}
