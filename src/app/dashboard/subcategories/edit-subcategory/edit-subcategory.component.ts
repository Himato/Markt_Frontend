import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../shared/services/category.service';
import { Category } from './../../../shared/models/util.models';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subcategory } from 'src/app/shared/models/util.models';

@Component({
  selector: 'app-edit-subcategory',
  templateUrl: './edit-subcategory.component.html',
  styleUrls: ['./edit-subcategory.component.css']
})
export class EditSubcategoryComponent implements OnInit {
  @ViewChild('form', { static: false }) form: NgForm;
  subcategory: Subcategory;
  categories: Category[];
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
        this.router.navigate(['/dashboard', 'subcategories']);
      }

      this.categoryService.getCategories().subscribe((categories: Category[]) => {
        this.categories = categories;
      });

      this.categoryService.getSubcategory(id).subscribe((subcategory: Subcategory) => {
        this.subcategory = subcategory;
        this.fetching = false;
      }, () => {
        this.router.navigate(['/dashboard', 'subcategories']);
      });
    });
  }

  onSubmit() {
    this.submitting = true;
    this.categoryService.updateSubcategory(
      this.subcategory.id,
      this.form.value.categoryId,
      this.form.value.name,
    ).subscribe(() => {
      this.submitting = false;
      this.process = 'Subcategory has been updated';
      this.error = null;
    }, error => {
      this.submitting = false;
      this.process = null;
      this.error = error.error.message;
    });
  }

  onDelete() {
    const sure = confirm('Do you really want to delete this subcategory? ');
    if (sure) {
      this.deleting = true;
      this.categoryService.deleteSubcategory(this.subcategory.id).subscribe(() => {
        this.deleting = false;
        this.error = null;
        this.router.navigate(['/dashboard', 'subcategories']);
      }, error => {
        this.error = error.error.message;
      });
    }
  }
}
