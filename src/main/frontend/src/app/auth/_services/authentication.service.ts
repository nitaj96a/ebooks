import { User } from './../../users/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject : BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public currentUserHack : User;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    //console.log(JSON.parse(localStorage.getItem('currentUser')));
    var userTry = JSON.parse(localStorage.getItem('currentUser'));
    //console.log(`current user subject: ${this.currentUserSubject}`);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserHack = userTry;
  }

  public get currentUserValue(): User {
    //console.log(this.currentUserSubject.value)
    return this.currentUserSubject.value;
  }

  public currentUserValueHack(): User {
    return this.currentUserHack;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`/auth/login`, {username, password})
      .pipe(map(user => {
        if (user && user.token) {
          //var user = new User("","",username, "", "", token.access_token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.currentUserHack = user;
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAdmin() {
    return this.currentUserSubject.value.type == 'admin' ? true : false;
  }
}
