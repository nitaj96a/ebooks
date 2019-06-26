var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AuthenticationService } from './../../auth/_services/authentication.service';
import { Component } from "@angular/core";
import { EbookService } from "../ebook.service";
var EbooksListComponent = /** @class */ (function () {
    function EbooksListComponent(ebookService, authenticationService) {
        var _this = this;
        this.ebookService = ebookService;
        this.authenticationService = authenticationService;
        this.ebooks = [];
        this.authenticationService.currentUser.subscribe(function (x) { return _this.currentUser = x; });
    }
    EbooksListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ebookService.getEbooks()
            .subscribe(function (ebooks) {
            _this.ebooks = ebooks;
        }, function (error) { return console.log(error); });
    };
    EbooksListComponent.prototype.getCategoryById = function (id) {
        console.log(id);
    };
    EbooksListComponent.prototype.download = function (idStr, mime) {
        var id = Number(idStr);
        this.ebookService.downloadEbookFile(id, mime);
    };
    EbooksListComponent.prototype.delete = function (id) {
        var _this = this;
        console.log('in delete ' + id);
        return this.ebookService.deleteEbook(id).subscribe(function () {
            for (var i = 0; i < _this.ebooks.length; i++) {
                if (_this.ebooks[i].id === id) {
                    _this.ebooks.splice(i, 1);
                }
            }
        });
    };
    EbooksListComponent = __decorate([
        Component({
            selector: "app-ebooks-list",
            templateUrl: "./ebooks-list.component.html",
            styleUrls: ["./ebooks-list.component.css"]
        }),
        __metadata("design:paramtypes", [EbookService, AuthenticationService])
    ], EbooksListComponent);
    return EbooksListComponent;
}());
export { EbooksListComponent };
//# sourceMappingURL=ebooks-list.component.js.map