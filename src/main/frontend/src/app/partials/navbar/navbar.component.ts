import { AuthenticationService } from './../../auth/_services/authentication.service';
import { User } from './../../users/user.model';
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    public isCollapsed: boolean;

    currentUser: User;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    login() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

}
