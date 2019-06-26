var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/_guards/auth.guard';
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { EbooksComponent } from "./ebooks/ebooks.component";
import { EbooksAddComponent } from "./ebooks/ebooks-add/ebooks-add.component";
import { EbooksEditComponent } from './ebooks/ebooks-edit/ebooks-edit.component';
import { CategoriesAddComponent } from './categories/categories-add/categories-add.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { CategoriesComponent } from './categories/categories.component';
var routes = [
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    { path: 'ebooks', component: EbooksComponent },
    { path: 'ebooks/add', component: EbooksAddComponent, canActivate: [AuthGuard] },
    { path: 'ebooks/edit/:id', component: EbooksEditComponent, canActivate: [AuthGuard] },
    { path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard] },
    { path: 'categories/add', component: CategoriesAddComponent, canActivate: [AuthGuard] },
    { path: 'categories/edit/:id', component: CategoriesEditComponent, canActivate: [AuthGuard] },
    { path: '', component: EbooksComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: '' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map