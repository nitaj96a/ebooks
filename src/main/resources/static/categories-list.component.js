var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
var CategoriesListComponent = /** @class */ (function () {
    function CategoriesListComponent(categoryService) {
        this.categoryService = categoryService;
    }
    CategoriesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categoryService.getCategories().subscribe(function (categories) {
            _this.categories = categories;
        });
    };
    CategoriesListComponent.prototype.delete = function (id) {
        //this.categoryService.deleteCategory(id);
    };
    CategoriesListComponent = __decorate([
        Component({
            selector: 'app-categories-list',
            templateUrl: './categories-list.component.html',
            styleUrls: ['./categories-list.component.css']
        }),
        __metadata("design:paramtypes", [CategoryService])
    ], CategoriesListComponent);
    return CategoriesListComponent;
}());
export { CategoriesListComponent };
//# sourceMappingURL=categories-list.component.js.map