import { ErrorInterceptor } from './auth/_helpers/error.interceptor';
import { JwtInterceptor } from './auth/_helpers/jwt.interceptor';
import { AuthenticationService } from './auth/_services/authentication.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HttpModule} from '@angular/http';
import {HeaderComponent} from './partials/header/header.component';
import {FooterComponent} from './partials/footer/footer.component';
import {NavbarComponent} from './partials/navbar/navbar.component';
import {LanguagesComponent} from './languages/languages.component';
import {LanguagesListComponent} from './languages/languages-list/languages-list.component';
import {LanguagesAddComponent} from './languages/languages-add/languages-add.component';
import {LanguagesSearchComponent} from './languages/languages-search/languages-search.component';
import {CategoriesComponent} from './categories/categories.component';
import {CategoriesListComponent} from './categories/categories-list/categories-list.component';
import {CategoriesAddComponent} from './categories/categories-add/categories-add.component';
import {CategoriesSearchComponent} from './categories/categories-search/categories-search.component';
import {EbooksComponent} from './ebooks/ebooks.component';
import {EbooksListComponent} from './ebooks/ebooks-list/ebooks-list.component';

import {UsersComponent} from './users/users.component';
import {UsersAddComponent} from './users/users-add/users-add.component';
import {UsersListComponent} from './users/users-list/users-list.component';
import {UserService} from './users/user.service';


import {EbookService} from './ebooks/ebook.service';

import {CollapseModule} from 'ngx-bootstrap/collapse';
import {EbooksAddComponent} from './ebooks/ebooks-add/ebooks-add.component';

import {CategoryService} from './categories/category.service';
import {EbooksSearchComponent} from './ebooks/ebooks-search/ebooks-search.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AuthGuard } from './auth/_guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EbooksEditComponent } from './ebooks/ebooks-edit/ebooks-edit.component';
import {PaginationModule, ButtonsModule, BsDropdownModule} from 'node_modules/ngx-bootstrap';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { LanguagesEditComponent } from './languages/languages-edit/languages-edit.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        UsersComponent,
        UsersAddComponent,
        UsersEditComponent,
        UsersListComponent,
        HeaderComponent,
        FooterComponent,
        NavbarComponent,
        LanguagesComponent,
        LanguagesListComponent,
        LanguagesAddComponent,
        LanguagesEditComponent,
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
        BsDropdownModule.forRoot(),
        PaginationModule.forRoot(),
        CollapseModule.forRoot(),
        ReactiveFormsModule,
        ButtonsModule,
    ],
    providers: [UserService, EbookService, CategoryService, AuthenticationService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
