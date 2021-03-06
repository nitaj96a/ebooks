var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ErrorInterceptor } from './auth/_helpers/error.interceptor';
import { JwtInterceptor } from './auth/_helpers/jwt.interceptor';
import { AuthenticationService } from './auth/_services/authentication.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguagesListComponent } from './languages/languages-list/languages-list.component';
import { LanguagesAddComponent } from './languages/languages-add/languages-add.component';
import { LanguagesSearchComponent } from './languages/languages-search/languages-search.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesAddComponent } from './categories/categories-add/categories-add.component';
import { CategoriesSearchComponent } from './categories/categories-search/categories-search.component';
import { EbooksComponent } from './ebooks/ebooks.component';
import { EbooksListComponent } from './ebooks/ebooks-list/ebooks-list.component';
import { UsersComponent } from './users/users.component';
import { UsersAddComponent } from './users/users-add/users-add.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserService } from './users/user.service';
import { EbookService } from './ebooks/ebook.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { EbooksAddComponent } from './ebooks/ebooks-add/ebooks-add.component';
import { CategoryService } from './categories/category.service';
import { EbooksSearchComponent } from './ebooks/ebooks-search/ebooks-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EbooksEditComponent } from './ebooks/ebooks-edit/ebooks-edit.component';
import { PaginationModule } from 'node_modules/ngx-bootstrap';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                UsersComponent,
                UsersAddComponent,
                UsersListComponent,
                HeaderComponent,
                FooterComponent,
                NavbarComponent,
                LanguagesComponent,
                LanguagesListComponent,
                LanguagesAddComponent,
                LanguagesSearchComponent,
                CategoriesComponent,
                CategoriesListComponent,
                CategoriesAddComponent,
                CategoriesEditComponent,
                CategoriesSearchComponent,
                EbooksComponent,
                EbooksListComponent,
                EbooksAddComponent,
                EbooksSearchComponent,
                LoginComponent,
                EbooksEditComponent
            ],
            imports: [
                BrowserModule,
                AppRoutingModule,
                HttpClientModule,
                PaginationModule.forRoot(),
                CollapseModule.forRoot(),
                ReactiveFormsModule
            ],
            providers: [UserService, EbookService, CategoryService, AuthenticationService,
                { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
                { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map