import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Ebook} from "./ebook.model";
import {map} from "rxjs/operators";
import {saveAs} from 'file-saver';
import { httpFactory } from "@angular/http/src/http_module";

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
        console.log(mime)
        const headers = new Headers();
        headers.append('Accept', mime);
        return this.http.get("/api/ebooks/" + id + "/file", {headers: headers})
            .toPromise()
            .then(response => this.saveToFileSystem(response, mime));
    }

    uploadEbookFile(file: File) {
        let formdata: FormData = new FormData();
        let headers = new Headers();
        console.log(file);
        //headers.append('Content-Type', 'multipart/form-data');
        //console.log(headers);
        formdata.append('file', file);
        formdata.set('file', file);
        console.log(formdata.getAll);
        return this.http.post("/api/ebooks/file", formdata).pipe(map(response => response.json()));
    }

    uploadEbookThumbnail() {

    }

    private saveToFileSystem(response, mime) {
        const contentDispositionHeader: string = response.headers.get('Content-Disposition');
        const parts: string[] = contentDispositionHeader.split(';');
        let filename = parts[1].split('=')[1];
        filename = filename.split("\"")[1];
        console.log("filename: " + filename);
        const file = new File([response._body], filename, {type: mime});
        console.log(file);
        saveAs(file);
    }
}
