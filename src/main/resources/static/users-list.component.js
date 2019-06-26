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
import { UserService } from "../user.service";
var UsersListComponent = /** @class */ (function () {
    function UsersListComponent(userService) {
        this.userService = userService;
        this.users = [];
    }
    UsersListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (users) {
            _this.users = users;
        }, function (error) { return console.log(error); });
    };
    UsersListComponent.prototype.getIfUserPromoted = function (user) {
        return user.type === "admin" ? 'badge-success' : 'badge-primary';
    };
    UsersListComponent = __decorate([
        Component({
            selector: "app-users-list",
            templateUrl: "./users-list.component.html",
            styleUrls: ["./users-list.component.css"]
        }),
        __metadata("design:paramtypes", [UserService])
    ], UsersListComponent);
    return UsersListComponent;
}());
export { UsersListComponent };
//# sourceMappingURL=users-list.component.js.map