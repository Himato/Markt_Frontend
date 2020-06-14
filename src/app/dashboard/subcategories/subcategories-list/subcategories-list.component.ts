import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../shared/services/category.service';
import { AdminSubcategories } from './../../../shared/models/util.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subcategories-list',
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.css']
})
export class SubcategoriesListComponent implements OnInit {
  subcategories: AdminSubcategories[];
  fetching = true;
  id: number;

  constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.queryParams.new;
    this.categoryService.getAdminSubcategories().subscribe((subcategories: AdminSubcategories[]) => {
      this.subcategories = subcategories;
      this.fetching = false;
    }, () => {
      this.fetching = false;
    });
  }
}
