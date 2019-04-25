import { User } from './../../users/user.model';
import { AuthenticationService } from './../../auth/_services/authentication.service';
import {Component, OnInit, Input} from "@angular/core";
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
    imagesToShow: Map<number, any> = new Map<number, any>();

    @Input() ebookResults: Ebook[];

    constructor(private ebookService: EbookService, private authenticationService: AuthenticationService,) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.ebookService.getEbooks()
            .subscribe(
                (ebooks: any[]) => {
                    this.ebooks = ebooks;
                },
                (error) => console.log(error),
                () => {
                    this.downloadCovers();
                },
            );
    }

    downloadCovers() {
        this.ebooks.forEach(ebook => {
            this.ebookService.downloadEbookThumbnail(ebook.id).subscribe(thumb => {
                this.createImageFromBlob(thumb, ebook.id);
                //console.log(thumb);
                //this.images.set(ebook.id, thumb);
            });
        });
    }

    createImageFromBlob(image: Blob, id: number) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            this.imagesToShow.set(id, reader.result);
            //console.log(this.imagesToShow);
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

    updateEbooks(ebooks: Ebook[]) {
        this.ebooks = ebooks;
        console.log(this.ebooks);
    }
}
