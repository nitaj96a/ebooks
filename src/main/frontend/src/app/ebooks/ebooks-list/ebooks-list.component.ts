import { User } from './../../users/user.model';
import { AuthenticationService } from './../../auth/_services/authentication.service';
import {Component, OnInit} from "@angular/core";
import {Ebook} from "../ebook.model";
import {EbookService} from "../ebook.service";

@Component({
    selector: "app-ebooks-list",
    templateUrl: "./ebooks-list.component.html",
    styleUrls: ["./ebooks-list.component.css"]
})
export class EbooksListComponent implements OnInit {
    ebooks: Ebook[] = [];
    currentUser: User;
    images: Map<number, any> = new Map<number, any>();
    imagesToShow: any[] = [];

    constructor(private ebookService: EbookService, private authenticationService: AuthenticationService,) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.ebookService.getEbooks()
            .subscribe(
                (ebooks: any[]) => {
                    this.ebooks = ebooks;
                    this.downloadCovers();
                },
                (error) => console.log(error),
                () => {
                    console.log(this.images);
                }
            );
    }

    downloadCovers() {
        this.ebooks.forEach(ebook => {
            this.ebookService.downloadEbookThumbnail(ebook.id).subscribe(thumb => {
                this.createImageFromBlob(thumb);
                console.log(thumb);
                this.images.set(ebook.id, thumb);
            });
        });
    }

    createImageFromBlob(image: Blob) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            this.imagesToShow.push(reader.result);
        });

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    getCategoryById(id: number) {
        console.log(id);
    }

    download(idStr: string, mime: string) {
        let id = Number(idStr);
        this.ebookService.downloadEbookFile(id, mime);
    }

    delete(id: number) {
        console.log('in delete ' + id);
        return this.ebookService.deleteEbook(id).subscribe(() => {
            for (let i = 0; i < this.ebooks.length; i++) {
                if (this.ebooks[i].id === id) {
                  this.ebooks.splice(i, 1);
                }
              }
        });
    }
}
