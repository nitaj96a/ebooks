import {Component, OnInit} from '@angular/core';
import { User } from '../user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/auth/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserForEdit } from '../user-for-edit';
import { last } from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-users-add',
    templateUrl: './users-add.component.html',
    styleUrls: ['./users-add.component.css']
})
export class UsersAddComponent implements OnInit {
    currentUser: User;
    addUserForm: FormGroup;
    userForCreation: UserForEdit;

    constructor(
        private authService: AuthenticationService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
    ) {
    }

    ngOnInit() {
        this.createForm();
        this.authService.currentUser.subscribe(u => this.currentUser = u);
    }

    onSubmit() {
        if (this.addUserForm.valid) {
            const firstName: string = this.addUserForm.controls.inputFirstName.value;
            const lastName: string = this.addUserForm.controls.inputLastName.value;
            const username: string = this.addUserForm.controls.inputUsername.value;
            const type: string = this.addUserForm.controls.inputType.value;
            const password: string = this.addUserForm.controls.inputPassword.value;
            this.userForCreation = {
                id: 0,
                username: username,
                firstName: firstName,
                lastName: lastName,
                type: type,
                password: password,
            };
            this.userService.createUser(this.userForCreation).subscribe(() => {
              this.router.navigateByUrl('/users');
            });
          }
    }

    createForm() {
        this.addUserForm = this.formBuilder.group({
            inputFirstName: ['', Validators.required],
            inputLastName: ['', Validators.required],
            inputUsername: ['', Validators.required],
            inputType: ['regular', Validators.required],
            inputPassword: ['', Validators.required],
            inputConfirmPassword: ['', Validators.required],
        }, {validator: this.passwordMatchValidator});
    }

    passwordMatchValidator(g: FormGroup) {
        return g.controls.inputPassword.value === g.controls.inputConfirmPassword.value ? null : {mismatch: true};
    }

}
