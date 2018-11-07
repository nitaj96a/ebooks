import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import {EbooksComponent} from "./ebooks/ebooks.component";
import {EbooksAddComponent} from "./ebooks/ebooks-add/ebooks-add.component";

const routes: Routes = [
    {path: 'users', component: UsersComponent},
    {path: 'ebooks', component: EbooksComponent},
    {path: 'ebooks/add', component: EbooksAddComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
