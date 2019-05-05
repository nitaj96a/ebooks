import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { AuthenticationService } from 'src/app/auth/_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserForEdit } from '../user-for-edit';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {
  userId: number;
  userForEdit: UserForEdit;
  currentUser: User;
  editUserForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      if (params['id']) {
        this.userService.getUser(this.userId).subscribe(user => {
          console.log(user);
          this.editUserForm.controls.inputFirstName.setValue(user.firstName);
          this.editUserForm.controls.inputLastName.setValue(user.lastName);
          this.editUserForm.controls.inputUsername.setValue(user.username);
          this.editUserForm.controls.inputType.setValue(user.type);
          this.editUserForm.controls.inputPassword.setValue(null);
          this.userForEdit = user;
        });
      }
    });
    this.authService.currentUser.subscribe(u => this.currentUser = u);
  }

  onSubmit() {
    if (this.editUserForm.valid) {
      const firstName: string = this.editUserForm.controls.inputFirstName.value;
      const lastName: string = this.editUserForm.controls.inputLastName.value;
      const username: string = this.editUserForm.controls.inputUsername.value;
      const type: string = this.editUserForm.controls.inputType.value;
      const password: string = this.editUserForm.controls.inputFirstName.value;
      this.userForEdit.firstName = firstName;
      this.userForEdit.lastName = lastName;
      this.userForEdit.username = username;
      this.userForEdit.type = type;
      this.userForEdit.password = password;
      this.userService.updateUser(this.userForEdit).subscribe(() => {
        this.router.navigateByUrl('/users');
      });
    }
  }

  createForm() {
    this.editUserForm = this.formBuilder.group({
      inputFirstName: ['', Validators.required],
      inputLastName: ['', Validators.required],
      inputUsername: ['', Validators.required],
      inputType: ['regular', Validators.required],
      inputPassword: [''],
      inputConfirmPassword: [''],
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.controls.inputPassword.value === g.controls.inputConfirmPassword.value ? null : {mismatch: true};
  }

}
