var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { Ebook } from "../ebook.model";
import { EbookService } from "../ebook.service";
import { CategoryService } from "./../../categories/category.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/auth/_services/authentication.service';
var EbooksAddComponent = /** @class */ (function () {
    function EbooksAddComponent(ebookService, categoryService, router, http, authService) {
        this.ebookService = ebookService;
        this.categoryService = categoryService;
        this.router = router;
        this.http = http;
        this.authService = authService;
        this.categories = [];
    }
    EbooksAddComponent.prototype.preview = function (files) {
        var _this = this;
        //console.log(files);
        if (files.length === 0)
            return;
        var mimeType = files[0].type;
        //console.log(mimeType);
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }
        var reader = new FileReader();
        this.imagePath = files;
        //console.log(this.imagePath);
        this.imgFile = files[0];
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            _this.imgURL = reader.result;
            //console.log(this.imgURL);
        };
    };
    EbooksAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categoryService.getCategories().subscribe(function (categories) {
            //console.log(categories);
            _this.categories = categories;
        }, function (error) { return console.log(error); });
        this.addEbookForm = new FormGroup({
            inputTitle: new FormControl(null, Validators.required),
            inputAuthor: new FormControl(null, Validators.required),
            inputYear: new FormControl(null),
            inputCategory: new FormControl(),
            inputKeywords: new FormControl(),
            inputThumbnail: new FormControl()
        });
        this.uploadFileForm = new FormGroup({
            inputFile: new FormControl(),
        });
    };
    EbooksAddComponent.prototype.ebookFileChange = function (event) {
        this.fileSelected = true;
        var fileList = event.target.files;
        var file = fileList[0];
        this.file = file;
        console.log(this.file);
        // if(event.target.files.length > 0) {
        //     let file = event.target.files[0];
        //     this.uploadFileForm.get('inputFile').setValue(file);
        // }
    };
    EbooksAddComponent.prototype.uploadFile = function () {
        var _this = this;
        console.log(this.file);
        this.ebookService.uploadEbookFile(this.file)
            .subscribe(function (ebook) {
            _this.ebook = ebook;
            _this.filename = ebook.filename;
            console.log(_this.filename);
            console.log(_this.ebook);
            _this.uploadedFile = true;
            _this.addEbookForm.controls.inputTitle.setValue(ebook.title);
            _this.addEbookForm.controls.inputAuthor.setValue(ebook.author);
            _this.addEbookForm.controls.inputKeywords.setValue(ebook.keywords);
        }, function (error) { return console.log(error); });
    };
    EbooksAddComponent.prototype.onSubmit = function () {
        var _this = this;
        var title = this.addEbookForm.controls.inputTitle.value;
        var author = this.addEbookForm.controls.inputAuthor.value;
        var year = Number(this.addEbookForm.controls.inputYear.value);
        var categoryId = Number(this.addEbookForm.controls.inputCategory.value);
        this.category = this.categories.filter(function (x) { return x.id == categoryId; })[0];
        console.log("chosen category id: " + categoryId);
        var keywords = this.addEbookForm.controls.inputKeywords.value;
        var filename = this.uploadFileForm.controls.inputFile.value;
        filename = filename.split('\\')[2]; // c:\fakepath\{filename}
        var thumbnailPath = this.addEbookForm.controls.inputThumbnail.value;
        thumbnailPath = thumbnailPath.split('\\')[2];
        //make a proper mime type string on the backend.. or have some type of enum here
        var mime = filename.split('.').pop();
        var formData = new FormData();
        formData.append('imgFile', this.imgFile);
        this.http.post('/api/ebooks/thumbnail', formData).subscribe();
        var user = { id: this.authService.currentUserValue.id };
        var ebook = new Ebook(title, author, year, this.category, keywords, filename, thumbnailPath, mime, user);
        console.log(ebook);
        this.ebookService.addEbook(ebook)
            .subscribe(function (ebook) {
            _this.ebook = ebook;
            console.log(ebook);
            _this.ebookService.indexEbook(ebook.id).subscribe();
            _this.router.navigate(['ebooks']);
        }, function (error) { return console.log(error); });
        //save the book 
        console.log(this.addEbookForm);
    };
    EbooksAddComponent = __decorate([
        Component({
            selector: "app-ebooks-add",
            templateUrl: "./ebooks-add.component.html",
            styleUrls: ["./ebooks-add.component.css"]
        }),
        __metadata("design:paramtypes", [EbookService,
            CategoryService,
            Router,
            HttpClient,
            AuthenticationService])
    ], EbooksAddComponent);
    return EbooksAddComponent;
}());
export { EbooksAddComponent };
//# sourceMappingURL=ebooks-add.component.js.map