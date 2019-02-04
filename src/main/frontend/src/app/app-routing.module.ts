import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/_guards/auth.guard';
import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {UsersComponent} from "./users/users.component";
import {EbooksComponent} from "./ebooks/ebooks.component";
import {EbooksAddComponent} from "./ebooks/ebooks-add/ebooks-add.component";

const routes: Routes = [
    {path: 'users', component: UsersComponent} ,// canActivate: [AuthGuard]},
    {path: 'ebooks', component: EbooksComponent},
    {path: 'ebooks/add', component: EbooksAddComponent }, //, canActivate: [AuthGuard]},
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
