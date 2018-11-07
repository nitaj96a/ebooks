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
}
