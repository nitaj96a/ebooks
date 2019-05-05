import {Component, OnInit} from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category.model';
import { User } from '../users/user.model';
import { AuthenticationService } from '../auth/_services/authentication.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    currentUser: User;

    constructor(
        private authService: AuthenticationService,
    ) {
    }

    ngOnInit() {
        this.authService.currentUser.subscribe(x => this.currentUser = x);
    }

}
