var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../categories/category.service';
import { FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { EbookService } from '../ebook.service';
var EbooksEditComponent = /** @class */ (function () {
    function EbooksEditComponent(ebookService, categoryService, route, router) {
        this.ebookService = ebookService;
        this.categoryService = categoryService;
        this.route = route;
        this.router = router;
    }
    EbooksEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categoryService.getCategories().subscribe(function (categories) {
            //console.log(categories);
            _this.categories = categories;
        }, function (error) { return console.log(error); });
        this.editEbookForm = new FormGroup({
            inputTitle: new FormControl(null, Validators.required),
            inputAuthor: new FormControl(null, Validators.required),
            inputYear: new FormControl(null),
            inputCategory: new FormControl(),
            inputKeywords: new FormControl(),
            inputThumbnail: new FormControl(),
            inputFile: new FormControl(),
        });
        this.route.params.subscribe(function (params) {
            //console.log(params);
            _this.ebookId = Number.parseInt(params['id']);
        });
        //console.log(this.ebookId);
        this.ebookService.getEbook(this.ebookId).subscribe(function (ebook) {
            _this.ebook = ebook;
            _this.editEbookForm.controls.inputTitle.setValue(_this.ebook.title);
            _this.editEbookForm.controls.inputAuthor.setValue(_this.ebook.author);
            _this.editEbookForm.controls.inputYear.setValue(_this.ebook.publicationYear);
            _this.editEbookForm.controls.inputKeywords.setValue(_this.ebook.keywords);
            //this.editEbookForm.controls.inputThumbnail.setValue(this.ebook.thumbnailPath);
            _this.imgURL = 'http://localhost:8080/ebook-thumbnails/' + _this.ebook.thumbnailPath;
            _this.editEbookForm.controls.inputCategory.setValue(_this.ebook.category);
            _this.editEbookForm.controls.inputCategory.setValue(_this.ebook.category.id);
        }, function (error) { return console.log(error); });
        // this.ebook.filename
    };
    EbooksEditComponent.prototype.ebookFileChange = function (event) {
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
    EbooksEditComponent.prototype.uploadFile = function () {
        var _this = this;
        console.log(this.file);
        this.ebookService.reuploadEbookFile(this.file, this.ebook.id)
            .subscribe(function (ebook) {
            _this.ebook = ebook;
            _this.filename = ebook.filename;
            console.log(_this.filename);
            console.log(_this.ebook);
            _this.editEbookForm.controls.inputTitle.setValue(ebook.title);
            _this.editEbookForm.controls.inputAuthor.setValue(ebook.author);
            _this.editEbookForm.controls.inputKeywords.setValue(ebook.keywords);
            _this.uploadedFile = true;
            _this.fileSelected = false;
        }, function (error) { return console.log(error); });
    };
    EbooksEditComponent.prototype.preview = function (files) {
        var _this = this;
        console.log('in change');
        console.log(files);
        var reader = new FileReader();
        this.imgFile = files[0];
        console.log(this.imgFile);
        reader.readAsDataURL(files[0]);
        reader.onload = function (_event) {
            _this.imgURL = reader.result;
            console.log(_this.imgURL);
        };
    };
    EbooksEditComponent.prototype.onSubmit = function () {
        var title = this.editEbookForm.controls.inputTitle.value;
        var author = this.editEbookForm.controls.inputAuthor.value;
        var year = Number(this.editEbookForm.controls.inputYear.value);
        var categoryId = Number(this.editEbookForm.controls.inputCategory.value);
        this.category = this.categories.filter(function (x) { return x.id == categoryId; })[0];
        console.log("chosen category id: " + categoryId);
        var keywords = this.editEbookForm.controls.inputKeywords.value;
        var filename = this.editEbookForm.controls.inputFile.value;
        filename = filename.split('\\')[2];
        //filename.s //strip(C:\fakepath\)
        var thumbnailPath = this.editEbookForm.controls.inputThumbnail.value;
        thumbnailPath = thumbnailPath.split('\\')[2];
        //start uploading files
    };
    EbooksEditComponent = __decorate([
        Component({
            selector: 'app-ebooks-edit',
            templateUrl: './ebooks-edit.component.html',
            styleUrls: ['./ebooks-edit.component.css']
        }),
        __metadata("design:paramtypes", [EbookService,
            CategoryService,
            ActivatedRoute,
            Router])
    ], EbooksEditComponent);
    return EbooksEditComponent;
}());
export { EbooksEditComponent };
//# sourceMappingURL=ebooks-edit.component.js.map