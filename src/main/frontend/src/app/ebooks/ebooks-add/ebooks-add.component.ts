import { map } from 'rxjs/operators';
import {Component, OnInit} from "@angular/core";
import {Ebook} from "../ebook.model";
import {EbookService} from "../ebook.service";
import {Category} from "./../../categories/category.model";
import {CategoryService} from "./../../categories/category.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/auth/_services/authentication.service';
import { Language } from 'src/app/languages/language.model';
import { LanguagesService } from 'src/app/languages/languages.service';
import { ErrorInterceptor } from 'src/app/auth/_helpers/error.interceptor';

@Component({
    selector: "app-ebooks-add",
    templateUrl: "./ebooks-add.component.html",
    styleUrls: ["./ebooks-add.component.css"]
})
export class EbooksAddComponent implements OnInit {
    categories: Category[] = [];
    languages: Language[] = [];
    addEbookForm: FormGroup;
    uploadFileForm: FormGroup;
    ebook: Ebook;
    category: Category;
    fileSelected: boolean;
    uploadedFile: boolean;
    file: File;
    imgFile: File;
    filename: String;
    language: Language;


    public imagePath;
    imgURL: any;
    public message: string;

    constructor(
        private ebookService: EbookService,
        private categoryService: CategoryService,
        private router: Router,
        private http: HttpClient,
        private authService: AuthenticationService,
        private langService: LanguagesService,
    ) {
    }

    preview(files: FileList) {
        console.log(files);
        if (files.length === 0) 
            return;

        var mimeType = files[0].type;
        //console.log(mimeType);
        if(mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }

        var reader = new FileReader();
        this.imagePath = files;
        //console.log(this.imagePath);
        this.imgFile = files[0];
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgURL = reader.result;
            //console.log(this.imgURL);
        }
    }

    ngOnInit() {
        this.categoryService.getCategories().subscribe(
            (categories: any[]) => {
                //console.log(categories);
                this.categories = categories;
                console.log(this.categories);
            },
            error => console.log(error)
        );

        this.langService.getLanguages().subscribe(
            (languages: Language[]) => {
                this.languages = languages;
                console.log(this.languages);
            },
            error => console.log(error)
        );

        this.addEbookForm = new FormGroup({
            inputTitle: new FormControl(null, Validators.required),
            inputAuthor: new FormControl(null, Validators.required),
            inputYear: new FormControl(null),
            inputCategory: new FormControl(),
            inputLanguage: new FormControl(),
            inputKeywords: new FormControl(),
            inputThumbnail: new FormControl()
        });


        this.uploadFileForm = new FormGroup({
            inputFile: new FormControl(),
        });
    }

    ebookFileChange(event) { 
        this.fileSelected = true;
        let fileList: FileList = event.target.files;
        let file: File = fileList[0];
        this.file = file;
        console.log(this.file);
        // if(event.target.files.length > 0) {
        //     let file = event.target.files[0];
        //     this.uploadFileForm.get('inputFile').setValue(file);
        // }
    }

    uploadFile() {
        console.log(this.file);
        this.ebookService.uploadEbookFile(this.file)
            .subscribe((ebook: Ebook) => {
                this.ebook = ebook;
                this.filename = ebook.filename;
                console.log(this.filename);
                console.log(this.ebook);
                this.uploadedFile = true;
                this.addEbookForm.controls.inputTitle.setValue(ebook.title);
                this.addEbookForm.controls.inputAuthor.setValue(ebook.author);
                this.addEbookForm.controls.inputKeywords.setValue(ebook.keywords);
            },
            (error) => console.log(error)
        );
    }

    onSubmit() {

        let title: string = this.addEbookForm.controls.inputTitle.value;
        let author: string = this.addEbookForm.controls.inputAuthor.value;
        let year: number = Number(this.addEbookForm.controls.inputYear.value);
        let categoryId = Number(this.addEbookForm.controls.inputCategory.value);
        this.category = this.categories.filter(x => x.id == categoryId)[0];
        console.log("chosen category id: "+ categoryId);
        let languageId = Number(this.addEbookForm.controls.inputLanguage.value);
        this.language = this.languages.filter(x => x.id == languageId)[0];
        console.log("chosen language id: "+ languageId);
        let keywords: string = this.addEbookForm.controls.inputKeywords.value;
        let filename: string = this.uploadFileForm.controls.inputFile.value;
        filename = filename.split('\\')[2]; // c:\fakepath\{filename}
        let thumbnailPath = this.addEbookForm.controls.inputThumbnail.value;
        thumbnailPath = thumbnailPath.split('\\')[2];

        //make a proper mime type string on the backend.. or have some type of enum here
        let mime = filename.split('.').pop();

        const formData = new FormData();
        formData.append('imgFile', this.imgFile);
        this.http.post('/api/ebooks/thumbnail', formData).subscribe();

        let user = {id: this.authService.currentUserValue.id};
        let ebook = new Ebook(title, author, year, this.category, keywords, filename, thumbnailPath, mime, user, this.language, null);
        console.log(ebook);
        this.ebookService.addEbook(ebook)
            .subscribe(
                (ebook: any) => {
                    this.ebook = ebook;
                    console.log(ebook);
                    //this.ebookService.indexEbook(ebook.id).subscribe();
                    this.router.navigate(['ebooks']);
                },
                (error) => console.log(error)
            );
        //save the book 
        console.log(this.addEbookForm);

    }
}
