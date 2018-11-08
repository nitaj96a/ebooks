import { Component, OnInit } from "@angular/core";
import { Ebook } from "../ebook.model";
import { EbookService } from "../ebook.service";
import { Category } from "./../../categories/category.model";
import { CategoryService } from "./../../categories/category.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: "app-ebooks-add",
    templateUrl: "./ebooks-add.component.html",
    styleUrls: ["./ebooks-add.component.css"]
})
export class EbooksAddComponent implements OnInit {
    categories: Category[] = [];
    addEbookForm: FormGroup;
    ebook: Ebook;
    category: Category;

    constructor(
        private ebookService: EbookService,
        private categoryService: CategoryService
    ) {}

    ngOnInit() {
        this.categoryService.getCategories().subscribe(
            (categories: any[]) => {
                this.categories = categories;
            },
            error => console.log(error)
        );

        this.addEbookForm = new FormGroup({
            inputTitle: new FormControl(null, Validators.required),
            inputAuthor: new FormControl(null, Validators.required),
            inputYear: new FormControl(null),
            inputCategory: new FormControl(),
            inputKeywords: new FormControl(),
            inputFile: new FormControl(),
            inputThumbnail: new FormControl()
        });
    }

    onSubmit() {

        let title: string = this.addEbookForm.controls.inputYear.value;
        let author: string = this.addEbookForm.controls.inputAuthor.value;
        let year: number = Number(this.addEbookForm.controls.inputYear.value);
        let categoryId = Number(this.addEbookForm.controls.inputCategory.value);
        let keywords: string = this.addEbookForm.controls.inputKeywords.value;
        let filename: string = this.addEbookForm.controls.inputFile.value;
        let thumbnailPath = this.addEbookForm.controls.inputThumbnail.value;

        //start uploading files


        //make a proper mime type string on the backend.. or have some type of enum here
        let mime = filename.split('.').pop(); 
       
        this.categoryService.getCategoryById(categoryId)
            .subscribe(
                (category: any) => {
                    this.category = category;
                    let ebook = new Ebook(title, author, year, this.category, keywords, filename, thumbnailPath, mime);
                    console.log(ebook);
                    this.ebookService.addEbook(ebook)
                    .subscribe(
                        (ebook: any) => {
                            this.ebook = ebook;
                            // redirect to ebook page >
                        },
                        (error) => console.log(error)
                    );
                },
                (error) => console.log(error)
            );

        
        
        
        //save the book 
        console.log(this.addEbookForm)
        
    }
}
