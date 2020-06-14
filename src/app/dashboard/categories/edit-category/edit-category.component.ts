import { Category } from './../../../shared/models/util.models';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../shared/services/category.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  @ViewChild('form', { static: false }) form: NgForm;
  category: Category;
  fetching = true;
  submitting = false;
  deleting = false;
  process: string = null;
  error: string = null;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = +params.id;

      if (!id) {
        this.router.navigate(['/dashboard', 'categories']);
      }

      this.categoryService.getCategory(id).subscribe((category: Category) => {
        this.category = category;
        this.fetching = false;
      }, () => {
        this.router.navigate(['/dashboard', 'categories']);
      });
    });
  }

  onSubmit() {
    this.submitting = true;
    this.categoryService.updateCategory(
      this.category.id,
      this.form.value.name,
    ).subscribe(() => {
      this.submitting = false;
      this.process = 'Category has been updated';
      this.error = null;
    }, error => {
      this.submitting = false;
      this.process = null;
      this.error = error.error.message;
    });
  }

  onDelete() {
    const sure = confirm('Do you really want to delete this category? ');
    if (sure) {
      this.deleting = true;
      this.categoryService.deleteCategory(this.category.id).subscribe(() => {
        this.deleting = false;
        this.error = null;
        this.router.navigate(['/dashboard', 'categories']);
      }, error => {
        this.error = error.error.message;
      });
    }
  }
}
