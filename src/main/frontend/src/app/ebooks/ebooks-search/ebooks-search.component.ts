import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { Language } from 'src/app/languages/language.model';
import { LanguagesService } from 'src/app/languages/languages.service';
import { EbookService } from '../ebook.service';
import { Ebook } from '../ebook.model';

@Component({
    selector: 'app-ebooks-search',
    templateUrl: './ebooks-search.component.html',
    styleUrls: ['./ebooks-search.component.css']
})
export class EbooksSearchComponent implements OnInit {
    expanded: boolean = false;
    searchEbookForm: FormGroup;
    languages: Language[] = [];
    fields = ['Text', 'Keywords', 'Title', 'Author', 'Filename'];

    @Output() ebookEmitter = new EventEmitter<Ebook[]>();

    ebooks: Ebook[] = [];
    constructor(
        private langService: LanguagesService,
        private ebookService: EbookService,
        ) {
    }

    ngOnInit() {

        this.searchEbookForm = new FormGroup({
            inputValue: new FormControl(),
            valueSearchType: new FormControl('Term'),
            inputField: new FormControl(),
            inputTitle: new FormControl(),
            titleSearchType: new FormControl('Term'),
            inputAuthor: new FormControl(),
            authorSearchType: new FormControl('Term'),
            inputKeyword: new FormControl(),
            keywordSearchType: new FormControl('Term'),
            inputContent: new FormControl(),
            contentSearchType: new FormControl('Term'),
            inputLanguage: new FormControl(),
            booleanSearchOption: new FormControl(),
        });
        this.langService.getLanguages().subscribe(
            languages => {
                this.languages = languages;
            }
        );
    }

    search() {

        if (!this.expanded) {
            let valueQuery: string = this.searchEbookForm.controls.inputValue.value;

            if (valueQuery == '' || null) {
                var empty : Ebook[] = [];
                var eb1 = new Ebook('fake', 'fake', 0, {id:1, name:'fake'}, 'none', 'fake', 'fake', 'fake', {id: 1, username:'fake'}, {id:1, name: 'english'}, null);
                let eb: Ebook;
                eb1.id = -1;
                empty.push(eb1);
                this.ebookEmitter.emit(empty);
                return;
            }

            let searchType = this.searchEbookForm.controls.valueSearchType.value;

            let fieldValue: string = this.searchEbookForm.controls.inputField.value.toLowerCase();

            if (searchType == 'Term') {
                this.ebookService.termSearch(valueQuery, fieldValue).subscribe(ebooks => {
                    this.ebooks = ebooks;
                    if (this.ebooks.length == 0) {}
                    console.log(ebooks);
                    this.ebookEmitter.emit(this.ebooks);
                });
            }

        } else {

        let titleQuery: string = this.searchEbookForm.controls.inputTitle.value;

        console.log(this.searchEbookForm.controls.inputTitlePhrase.value);

        let authorQuery: string = this.searchEbookForm.controls.inputAuthor.value;


        let keywordQuery: string = this.searchEbookForm.controls.inputKeyword.value;


        let contentQuery: string = this.searchEbookForm.controls.inputContent.value;


        let selectedLangId: number = this.searchEbookForm.controls.inputLanguage.value;
        let selectedLang: Language = this.languages.filter(x => x.id == selectedLangId)[0];

        let booleanSearchOpt = this.searchEbookForm.controls.booleanSearchOption.value;

        if (booleanSearchOpt == 'AND') {}

        if (booleanSearchOpt == 'OR') {}
        }
        
        

    }

    toggleExpand() {
        this.expanded = !this.expanded;
    }
}
