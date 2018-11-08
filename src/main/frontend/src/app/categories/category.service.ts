import { Injectable } from "@angular/core";
import {Http} from "@angular/http";
import {map} from "rxjs/operators";
import {Category} from "./category.model";
@Injectable()
export class CategoryService {
    constructor(private http: Http) {

    }

    getCategories() {
        return this.http.get("/api/categories").pipe(map(response => response.json()));
    }
    
    getCategoryById(id: number) {
        return this.http.get("/api/categories/"+id).pipe(map(response => response.json()));
    }
}