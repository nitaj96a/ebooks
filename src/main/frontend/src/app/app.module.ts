import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
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

@NgModule({
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
    CategoriesSearchComponent,
    EbooksComponent,
    EbooksListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    CollapseModule.forRoot()
  ],
  providers: [UserService, EbookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
