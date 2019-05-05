import {Component, OnInit} from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { User } from 'src/app/users/user.model';
import { AuthenticationService } from 'src/app/auth/_services/authentication.service';

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
    categories: Category[];
    currentUser: User;
    constructor(
        private categoryService: CategoryService,
        private authenticationService: AuthenticationService,
        ) {
    }

ngOnInit() {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.categoryService.getCategories().subscribe(categories => {
            this.categories = categories;
        });
    }

    delete(id: number) {
        this.categoryService.deleteCategory(id).subscribe(() => {
            for (let i = 0; i < this.categories.length; i++) {
                if (this.categories[i].id === id) {
                    this.categories.splice(i, 1);
                }
            }
        });
    }
}
