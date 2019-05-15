import {Component, OnInit} from "@angular/core";
import {User} from "../user.model";
import {UserService} from "../user.service";

@Component({
    selector: "app-users-list",
    templateUrl: "./users-list.component.html",
    styleUrls: ["./users-list.component.css"]
})
export class UsersListComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UserService) {

    }

    ngOnInit() {

        this.userService.getUsers()
            .subscribe(
                (users: any[]) => {
                    this.users = users;
                    console.log(this.users);
                },
                (error) => console.log(error)
            );


    }

    toggleEnabled(id: number) {
        this.userService.toggleEnabled(id).subscribe(user => {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].id === id) {
                    this.users[i]['enabled'] = user['enabled'];
                }
            }
        });
    }

    getIfUserPromoted(user: User) {
        return user.type === "admin" ? 'badge-success' : 'badge-primary';
    }

}
