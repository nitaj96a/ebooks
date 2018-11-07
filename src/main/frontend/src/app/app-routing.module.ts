import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import {EbooksComponent} from "./ebooks/ebooks.component";

const routes: Routes = [
    {path: 'users', component: UsersComponent},
    {path: 'ebooks', component: EbooksComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
