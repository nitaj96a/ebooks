import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Ebook} from "./ebook.model";
import {map, tap} from "rxjs/operators";
import {saveAs} from 'file-saver';
import { httpFactory } from "@angular/http/src/http_module";

@Injectable()
export class EbookService {

    constructor(private http: HttpClient) {

    }

    getEbook(id: Number) {
        return this.http.get<Ebook>('api/ebooks/'+id)
    }

    getEbooks() {
        return this.http.get<Ebook[]>("/api/ebooks")//.pipe(map(response => response.json()));
    }

    addEbook(ebook: Ebook) {
        console.log(ebook);
        return this.http.post<Ebook>("/api/ebooks", ebook)//.pipe(map(response => response.json()));
    }

    indexEbook(id: Number) {
        return this.http.get<Boolean>("/api/ebooks/"+id+"/index")
    }

    downloadEbookFile(id: number, mime: string) {
        //console.log(mime)
        const headers = new HttpHeaders({
            'Accept': mime
        });
        //headers.append('Accept', mime);
        //this.saveToFileSystem(this.http.get("/api/ebooks/" + id + "/file").subscribe(), mime)//, {headers: headers})
        //var response = this.http.get("/api/ebooks/" + id + "/file", {observe: 'response', headers: headers});//.subscribe(response => this.saveToFileSystem(response, mime));//, {headers: headers})
        // var file = this.http.get("/api/ebooks/" + id + "/file", {headers: headers, responseType: 'blob'})
        //     .pipe(
        //         tap(
        //             data => console.log(data),
        //             error => console.log(error)
        //             )
        //         );
        // console.log()
        // file.subscribe(data => this.saveToFileSystem2(data))//, {headers: headers})
        this.http.get("/api/ebooks/" + id + "/file", {observe: 'response', headers: headers, responseType: 'blob'})
            .subscribe(data => this.saveToFileSystem(data, mime));
        //console.log(response);
            // .toPromise()
            // .then(response => this.saveToFileSystem(response, mime));
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
        return this.http.post<any>("/api/ebooks/file", formdata)//.pipe(map(response => response.json()));
    }

    reuploadEbookFile(file: File, id: Number) {
        let formdata: FormData = new FormData();
        let headers = new Headers();
        console.log(file);
        formdata.append('file', file);
        //formdata.append('ebook', ebook);
        formdata.set('file', file);
        console.log(formdata.getAll);
        return this.http.post<any>("/api/ebooks/"+ id + "/file", formdata)//.pipe(map(response => response.json()));
    }

    uploadEbookThumbnail() {

    }

    

    private saveToFileSystem(response, mime) {
        console.log(response);
        const contentDispositionHeader: string = response.headers.get('Content-Disposition');
        const parts: string[] = contentDispositionHeader.split(';');
        let filename = parts[1].split('=')[1];
        filename = filename.split("\"")[1];
        console.log("filename: " + filename);
        const file = new File([response.body], filename, {type: mime});
        console.log(file);
        saveAs(file);
    }
}
