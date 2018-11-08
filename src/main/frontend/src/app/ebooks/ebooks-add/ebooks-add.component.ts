import { Component, OnInit } from "@angular/core";
import { Ebook } from "../ebook.model";
import { EbookService } from "../ebook.service";
import { Category } from "./../../categories/category.model";
import { CategoryService } from "./../../categories/category.service";

@Component({
    selector: "app-ebooks-add",
    templateUrl: "./ebooks-add.component.html",
    styleUrls: ["./ebooks-add.component.css"]
})
export class EbooksAddComponent implements OnInit {
    submitted = false;
    categories: Category[] = [];

    constructor(private ebookService: EbookService, private categoryService: CategoryService ) {}

    ngOnInit() {
        this.categoryService.getCategories()
            .subscribe(
                (categories: any[]) => {
                    this.categories = categories;
                },
                (error) => console.log(error)
            )
    }

    onSubmit(event: Event) {
        event.preventDefault();
        console.log() ;
        this.submitted = true;
    }
}
