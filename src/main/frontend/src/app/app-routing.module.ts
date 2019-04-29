import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/_guards/auth.guard';
import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {UsersComponent} from "./users/users.component";
import {EbooksComponent} from "./ebooks/ebooks.component";
import {EbooksAddComponent} from "./ebooks/ebooks-add/ebooks-add.component";
import { EbooksEditComponent } from './ebooks/ebooks-edit/ebooks-edit.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesAddComponent } from './categories/categories-add/categories-add.component';
import { CategoriesEditComponent } from './categories/categories-edit/categories-edit.component';
import { CategoriesComponent } from './categories/categories.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguagesAddComponent } from './languages/languages-add/languages-add.component';
import { LanguagesEditComponent } from './languages/languages-edit/languages-edit.component';

const routes: Routes = [
    {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
    {path: 'ebooks', component: EbooksComponent},
    {path: 'ebooks/add', component: EbooksAddComponent , canActivate: [AuthGuard]},
    {path: 'ebooks/edit/:id', component: EbooksEditComponent , canActivate: [AuthGuard]},
    {path: 'categories', component: CategoriesComponent , canActivate: [AuthGuard]},
    {path: 'categories/add', component: CategoriesAddComponent , canActivate: [AuthGuard]},
    {path: 'categories/edit/:id', component: CategoriesEditComponent , canActivate: [AuthGuard]},
    {path: 'languages', component: LanguagesComponent , canActivate: [AuthGuard]},
    {path: 'languages/add', component: LanguagesAddComponent , canActivate: [AuthGuard]},
    {path: 'languages/edit/:id', component: LanguagesEditComponent , canActivate: [AuthGuard]},
    {path: '', component: EbooksComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: ''}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
