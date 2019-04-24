import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-ebooks-search',
    templateUrl: './ebooks-search.component.html',
    styleUrls: ['./ebooks-search.component.css']
})
export class EbooksSearchComponent implements OnInit {

    searchEbookForm: FormGroup;

    constructor() {
    }

    ngOnInit() {

        this.searchEbookForm = new FormGroup({
            inputTitle: new FormControl(),
            inputAuthor: new FormControl(),
            inputKeyword: new FormControl(),
            inputContent: new FormControl(),
            inputLanguage: new FormControl(),
        });
    }

}
