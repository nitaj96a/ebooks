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
import { Role } from './users/role.enum';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { UsersAddComponent } from './users/users-add/users-add.component';

const routes: Routes = [
    {path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
    {path: 'users/me', component: UsersEditComponent, canActivate: [AuthGuard]},
    {path: 'users/edit/:id', component: UsersEditComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
    {path: 'users/add', component: UsersAddComponent, canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
    {path: 'ebooks', component: EbooksComponent},
    {path: 'ebooks/category/:catId', component: EbooksComponent},
    {path: 'ebooks/add', component: EbooksAddComponent , canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
    {path: 'ebooks/edit/:id', component: EbooksEditComponent , canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
    {path: 'categories', component: CategoriesComponent},
    {path: 'categories/add', component: CategoriesAddComponent , canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
    {path: 'categories/edit/:id', component: CategoriesEditComponent , canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
    {path: 'languages', component: LanguagesComponent , canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
    {path: 'languages/add', component: LanguagesAddComponent , canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
    {path: 'languages/edit/:id', component: LanguagesEditComponent , canActivate: [AuthGuard], data: {roles: [Role.Admin]}},
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
