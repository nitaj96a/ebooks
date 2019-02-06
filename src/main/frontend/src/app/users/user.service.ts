import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "./user.model";
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {

    }

    getUsers() {
        return this.http.get<User[]>("/api/users");//.pipe(map(data => data.json()));
    }
}
