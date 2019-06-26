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
var UsersAddComponent = /** @class */ (function () {
    function UsersAddComponent() {
    }
    UsersAddComponent.prototype.ngOnInit = function () {
    };
    UsersAddComponent = __decorate([
        Component({
            selector: 'app-users-add',
            templateUrl: './users-add.component.html',
            styleUrls: ['./users-add.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], UsersAddComponent);
    return UsersAddComponent;
}());
export { UsersAddComponent };
//# sourceMappingURL=users-add.component.js.map