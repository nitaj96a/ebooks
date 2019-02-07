import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Category} from "./category.model";

@Injectable()
export class CategoryService {
    constructor(private http: HttpClient) {

    }

    getCategories() {
        return this.http.get<Category[]>("/api/categories")//.pipe(map(response => response.json()));
    }

    getCategoryById(id: number) {
        return this.http.get<Category>("/api/categories/" + id)//.pipe(map(response => response.json()));
    }
}
