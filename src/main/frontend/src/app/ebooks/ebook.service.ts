import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Ebook} from "./ebook.model";
import {map} from "rxjs/operators";

@Injectable()
export class EbookService {

    constructor(private http: Http) {

    }

    getEbooks() {
        return this.http.get("/api/ebooks").pipe(map(response => response.json()));
    }

    addBook(ebook: Ebook) {
        return this.http.post("/api/ebooks", ebook).pipe(map(response => response.json()));
    }

}