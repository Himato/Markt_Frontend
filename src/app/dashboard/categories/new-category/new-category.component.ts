import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CategoryService } from './../../../shared/services/category.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent {
  @ViewChild('form', { static: false }) form: NgForm;
  submitting = false;
  error: string = null;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  onSubmit() {
    this.submitting = true;
    this.categoryService.addCategory(
      this.form.value.name,
    ).subscribe((id: number) => {
      this.error = null;
      this.submitting = false;
      this.router.navigate(['/dashboard', 'categories'], { queryParams: { new: id } });
    }, error => {
      this.submitting = false;
      this.error = error.error.message;
    });
  }
}
