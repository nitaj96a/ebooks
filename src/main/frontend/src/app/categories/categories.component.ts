import {Component, OnInit} from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category.model';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


    constructor() {
    }

    ngOnInit() {

    }

}
