import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-edit',
  templateUrl: './categories-edit.component.html',
  styleUrls: ['./categories-edit.component.css']
})
export class CategoriesEditComponent implements OnInit {
  editCategoryForm: FormGroup;
  category: Category;
  id: number;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.categoryService.getCategoryById(this.id).subscribe((c: Category) => {
          this.category = c;
          this.editCategoryForm.controls.inputName.setValue(c.name);
        });
      }
    });
  }

  onSubmit() {
    const name: string = this.editCategoryForm.controls.inputName.value;
    this.category.name = name;
    this.categoryService.editCategory(this.category).subscribe(() => {
      this.router.navigateByUrl('/categories');
    });
  }

  createForm() {
    this.editCategoryForm = this.fb.group({
      inputName: ['', Validators.required]
    });
  }

}
