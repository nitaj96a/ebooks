import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Ebook} from "./ebook.model";
import {map} from "rxjs/operators";
import { saveAs } from 'file-saver';

@Injectable()
export class EbookService {

    constructor(private http: Http) {

    }

    getEbooks() {
        return this.http.get("/api/ebooks").pipe(map(response => response.json()));
    }

    addEbook(ebook: Ebook) {
        return this.http.post("/api/ebooks", ebook).pipe(map(response => response.json()));
    }

    downloadEbookFile(id: number, mime: string) {
        const headers = new Headers();
        headers.append('Accept', mime);
        return this.http.get("/api/ebooks/"+id+"/file", {headers: headers})
            .toPromise()
            .then(response => this.saveToFileSystem(response, mime));
    }

    uploadEbookFile(){

    }

    uploadEbookThumbnail(){

    }

    private saveToFileSystem(response, mime) {
        const contentDispositionHeader: string = response.headers.get('Content-Disposition');
        const parts: string[] = contentDispositionHeader.split(';');
        let filename = parts[1].split('=')[1];
        filename = filename.split("\"")[1];
        console.log("filename: " + filename);
        const file = new File([response._body],filename, { type: mime });
        console.log(file);
        saveAs(file);
    }
}