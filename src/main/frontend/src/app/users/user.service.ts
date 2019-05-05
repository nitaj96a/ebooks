import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "./user.model";
import {map} from 'rxjs/operators';
import { UserForEdit } from "./user-for-edit";

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {

    }

    getUsers() {
        return this.http.get<User[]>("/api/users");//.pipe(map(data => data.json()));
    }

    getUser(id: number) {
        return this.http.get<User>("api/users/"+id);
    }

    updateUser(user: UserForEdit) {
        return this.http.put<User>("/api/users/", user);
    }
}
