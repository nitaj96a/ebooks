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
            inputValuePhrase: new FormControl(),
            inputValueFuzzy: new FormControl(),
            inputField: new FormControl(),
            inputTitle: new FormControl(),
            inputTitlePhrase: new FormControl(),
            inputTitleFuzzy: new FormControl(),
            inputAuthor: new FormControl(),
            inputAuthorPhrase: new FormControl(),
            inputAuthorFuzzy: new FormControl(),
            inputKeyword: new FormControl(),
            inputKeywordPhrase: new FormControl(),
            inputKeywordFuzzy: new FormControl(),
            inputContent: new FormControl(),
            inputContentPhrase: new FormControl(),
            inputContentFuzzy: new FormControl(),
            inputLanguage: new FormControl(),
            BooleanOR: new FormControl(),
            BooleanAND: new FormControl(),
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
            let valueQueryPhrase: boolean = this.searchEbookForm.controls.inputValuePhrase.value;
            let valueQueryFuzzy: boolean = this.searchEbookForm.controls.inputValueFuzzy.value;
            let fieldValue: string = this.searchEbookForm.controls.inputField.value.toLowerCase();

            if (!valueQueryPhrase && !valueQueryFuzzy) {
                this.ebookService.termSearch(valueQuery, fieldValue).subscribe(ebooks => {
                    this.ebooks = ebooks;
                    console.log(ebooks);
                    this.ebookEmitter.emit(this.ebooks);
                });
            }

        } else {

        let titleQuery: string = this.searchEbookForm.controls.inputTitle.value;
        let titleQueryPhrase: boolean = this.searchEbookForm.controls.inputTitlePhrase.value;
        let titleQueryFuzzy: boolean = this.searchEbookForm.controls.inputTitleFuzzy.value;
        console.log(this.searchEbookForm.controls.inputTitlePhrase.value);

        let authorQuery: string = this.searchEbookForm.controls.inputAuthor.value;
        let authorQueryPhrase: boolean = this.searchEbookForm.controls.inputAuthorPhrase.value;
        let authorQueryFuzzy: boolean = this.searchEbookForm.controls.inputAuthorFuzzy.value;

        let keywordQuery: string = this.searchEbookForm.controls.inputKeyword.value;
        let keywordQueryPhrase: boolean = this.searchEbookForm.controls.inputKeywordPhrase.value;
        let keywordQueryFuzzy: boolean = this.searchEbookForm.controls.inputKeywordFuzzy.value;

        let contentQuery: string = this.searchEbookForm.controls.inputContent.value;
        let contentQueryPhrase: boolean = this.searchEbookForm.controls.inputContentPhrase.value;
        let contentQueryFuzzy: boolean = this.searchEbookForm.controls.inputContentFuzzy.value;

        let selectedLangId: number = this.searchEbookForm.controls.inputLanguage.value;
        let selectedLang: Language = this.languages.filter(x => x.id == selectedLangId)[0];

        let booleanOr: boolean = this.searchEbookForm.controls.BooleanOR.value;
        let booleanAnd: boolean = this.searchEbookForm.controls.BooleanAND.value;

        if (booleanAnd) {}

        if (booleanOr) {}
        }
        
        

    }

    toggleExpand() {
        this.expanded = !this.expanded;
    }
}
