import {Component, OnInit, ViewChild} from '@angular/core';
import { Ebook } from './ebook.model';
import { EbooksListComponent } from './ebooks-list/ebooks-list.component';

@Component({
    selector: 'app-ebooks',
    templateUrl: './ebooks.component.html',
    styleUrls: ['./ebooks.component.css']
})
export class EbooksComponent implements OnInit {
    ebooks: Ebook[] = [];
    @ViewChild(EbooksListComponent)
    private ebooksListComponent: EbooksListComponent;

    constructor() {
    }

    ngOnInit() {
    }

    updateEbookList(ebooks: Ebook[]) {
        this.ebooks = ebooks;
        this.ebooksListComponent.updateEbooks(this.ebooks);
    }
}
