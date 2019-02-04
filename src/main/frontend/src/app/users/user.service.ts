import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {User} from "./user.model";
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

    constructor(private http: Http) {

    }

    getUsers() {
        return this.http.get("/api/users").pipe(map(response => response.json()));
    }
}
