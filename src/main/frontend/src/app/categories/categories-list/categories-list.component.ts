import {Component, OnInit} from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
    categories: Category[];

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(categories => {
            this.categories = categories;
        });
    }

    delete(id: number) {
        //this.categoryService.deleteCategory(id);
    }
}
