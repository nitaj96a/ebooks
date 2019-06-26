var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        //console.log(JSON.parse(localStorage.getItem('currentUser')));
        var userTry = JSON.parse(localStorage.getItem('currentUser'));
        //console.log(`current user subject: ${this.currentUserSubject}`);
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUserHack = userTry;
    }
    Object.defineProperty(AuthenticationService.prototype, "currentUserValue", {
        get: function () {
            //console.log(this.currentUserSubject.value)
            return this.currentUserSubject.value;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.currentUserValueHack = function () {
        return this.currentUserHack;
    };
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post("/auth/login", { username: username, password: password })
            .pipe(map(function (user) {
            if (user && user.token) {
                //var user = new User("","",username, "", "", token.access_token);
                localStorage.setItem('currentUser', JSON.stringify(user));
                _this.currentUserSubject.next(user);
                _this.currentUserHack = user;
            }
            return user;
        }));
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    };
    AuthenticationService.prototype.isAdmin = function () {
        return this.currentUserSubject.value.type == 'admin' ? true : false;
    };
    AuthenticationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map