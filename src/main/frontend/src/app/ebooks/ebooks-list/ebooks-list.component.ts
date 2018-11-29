import { Component, OnInit } from "@angular/core";
import { Ebook } from "../ebook.model";
import { EbookService } from "../ebook.service";

@Component({
    selector: "app-ebooks-list",
    templateUrl: "./ebooks-list.component.html",
    styleUrls: ["./ebooks-list.component.css"]
})
export class EbooksListComponent implements OnInit {
    ebooks: Ebook[] = [];

    constructor(private ebookService: EbookService) {}

    ngOnInit() {
        this.ebookService.getEbooks()
            .subscribe(
                (ebooks: any[]) => {
                    this.ebooks = ebooks;
                },
                (error) => console.log(error)
            )
    }

    getCategoryById(id: number) {
        console.log(id);
    }

    download(idStr: string, mime: string) {
        let id = Number(idStr);
        this.ebookService.downloadEbookFile(id, mime);
    }
}
