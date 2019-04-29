import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-categories-add',
    templateUrl: './categories-add.component.html',
    styleUrls: ['./categories-add.component.css']
})
export class CategoriesAddComponent implements OnInit {
    addCategoryForm: FormGroup;
    category: Category;
    id: number;

    constructor(
        private categoryService: CategoryService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.addCategoryForm = this.fb.group({
            inputName: ['', Validators.required]
        });
    }

    onSubmit () {
        const name: string = this.addCategoryForm.controls.inputName.value;
        this.category = new Category(name);
        this.categoryService.addCategory(this.category).subscribe(() => {
            this.router.navigateByUrl('/categories')
        });
    }
    
}
