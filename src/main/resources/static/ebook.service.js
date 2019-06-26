var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Headers } from "@angular/http";
import { saveAs } from 'file-saver';
var EbookService = /** @class */ (function () {
    function EbookService(http) {
        this.http = http;
    }
    EbookService.prototype.getEbook = function (id) {
        return this.http.get('api/ebooks/' + id);
    };
    EbookService.prototype.getEbooks = function () {
        return this.http.get("/api/ebooks"); //.pipe(map(response => response.json()));
    };
    EbookService.prototype.addEbook = function (ebook) {
        console.log(ebook);
        return this.http.post("/api/ebooks", ebook); //.pipe(map(response => response.json()));
    };
    EbookService.prototype.indexEbook = function (id) {
        return this.http.get("/api/ebooks/" + id + "/index");
    };
    EbookService.prototype.downloadEbookFile = function (id, mime) {
        var _this = this;
        //console.log(mime)
        var headers = new HttpHeaders({
            'Accept': mime
        });
        //headers.append('Accept', mime);
        //this.saveToFileSystem(this.http.get("/api/ebooks/" + id + "/file").subscribe(), mime)//, {headers: headers})
        //var response = this.http.get("/api/ebooks/" + id + "/file", {observe: 'response', headers: headers});//.subscribe(response => this.saveToFileSystem(response, mime));//, {headers: headers})
        // var file = this.http.get("/api/ebooks/" + id + "/file", {headers: headers, responseType: 'blob'})
        //     .pipe(
        //         tap(
        //             data => console.log(data),
        //             error => console.log(error)
        //             )
        //         );
        // console.log()
        // file.subscribe(data => this.saveToFileSystem2(data))//, {headers: headers})
        this.http.get("/api/ebooks/" + id + "/file", { observe: 'response', headers: headers, responseType: 'blob' })
            .subscribe(function (data) { return _this.saveToFileSystem(data, mime); });
        //console.log(response);
        // .toPromise()
        // .then(response => this.saveToFileSystem(response, mime));
    };
    EbookService.prototype.uploadEbookFile = function (file) {
        var formdata = new FormData();
        var headers = new Headers();
        console.log(file);
        //headers.append('Content-Type', 'multipart/form-data');
        //console.log(headers);
        formdata.append('file', file);
        formdata.set('file', file);
        //console.log(formdata.getAll);
        return this.http.post("/api/ebooks/file", formdata); //.pipe(map(response => response.json()));
    };
    EbookService.prototype.reuploadEbookFile = function (file, id) {
        var formdata = new FormData();
        var headers = new Headers();
        console.log(file);
        formdata.append('file', file);
        //formdata.append('ebook', ebook);
        formdata.set('file', file);
        console.log(formdata.getAll);
        return this.http.post("/api/ebooks/" + id + "/file", formdata); //.pipe(map(response => response.json()));
    };
    EbookService.prototype.uploadEbookThumbnail = function () {
    };
    EbookService.prototype.saveToFileSystem = function (response, mime) {
        console.log(response);
        var contentDispositionHeader = response.headers.get('Content-Disposition');
        var parts = contentDispositionHeader.split(';');
        var filename = parts[1].split('=')[1];
        filename = filename.split("\"")[1];
        console.log("filename: " + filename);
        var file = new File([response.body], filename, { type: mime });
        console.log(file);
        saveAs(file);
    };
    EbookService.prototype.deleteEbook = function (id) {
        console.log('in e-service');
        return this.http.delete('/api/ebooks/' + id).pipe();
    };
    EbookService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], EbookService);
    return EbookService;
}());
export { EbookService };
//# sourceMappingURL=ebook.service.js.map