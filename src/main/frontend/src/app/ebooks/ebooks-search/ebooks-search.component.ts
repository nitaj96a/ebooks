import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
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
    @Input() categoryId: number;

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
            inputTitleBoolean: new FormControl('OR'),
            titleNot: new FormControl(),
            titleSearchType: new FormControl('Term'),
            inputAuthor: new FormControl(),
            inputAuthorBoolean: new FormControl('OR'),
            authorNot: new FormControl(),
            authorSearchType: new FormControl('Term'),
            inputKeyword: new FormControl(),
            inputKeywordBoolean: new FormControl('OR'),
            keywordNot: new FormControl(),
            keywordSearchType: new FormControl('Term'),
            inputContent: new FormControl(),
            inputContentBoolean: new FormControl('OR'),
            contentNot: new FormControl(),
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

            if (this.categoryId) {
                this.ebookService.simpleSearch(valueQuery, fieldValue, searchType, this.categoryId).subscribe(ebooks => {
                    this.ebooks = ebooks;
                    this.ebookEmitter.emit(this.ebooks);
                });
            } else {
                this.ebookService.simpleSearch(valueQuery, fieldValue, searchType).subscribe(ebooks => {
                    this.ebooks = ebooks;
                    this.ebookEmitter.emit(this.ebooks);
                });
            }

            

        } else {
            let titleQuery: string = this.searchEbookForm.controls.inputTitle.value;
            let titleQueryType = this.searchEbookForm.controls.titleSearchType.value;
            let authorQuery: string = this.searchEbookForm.controls.inputAuthor.value;
            let authorQueryType = this.searchEbookForm.controls.authorSearchType.value;
            let keywordQuery: string = this.searchEbookForm.controls.inputKeyword.value;
            let keywordQueryType = this.searchEbookForm.controls.keywordSearchType.value;
            let contentQuery: string = this.searchEbookForm.controls.inputContent.value;
            let contentQueryType = this.searchEbookForm.controls.contentSearchType.value;
            console.log(this.searchEbookForm.controls.inputLanguage.value);
            let selectedLangId: number = Number(this.searchEbookForm.controls.inputLanguage.value);
            if (selectedLangId == 0) {
                selectedLangId = null;
            }
            let selectedLang: Language = this.languages.filter(x => x.id == selectedLangId)[0];
            let booleanSearchOpt = this.searchEbookForm.controls.booleanSearchOption.value;
            let titleNot = this.searchEbookForm.controls.titleNot.value;
            titleNot == null ? titleNot = false : titleNot = true;
            let authorNot = this.searchEbookForm.controls.authorNot.value;
            authorNot == null ? authorNot = false : authorNot = true;
            let keywordNot = this.searchEbookForm.controls.keywordNot.value;
            keywordNot == null ? keywordNot = false : keywordNot = true;
            let contentNot = this.searchEbookForm.controls.contentNot.value;
            contentNot == null ? contentNot = false : contentNot = true;
            //console.log(titleNot);

            let advancedQuery = {
                title : titleQuery,
                titleType: titleQueryType,
                author: authorQuery,
                authorType: authorQueryType,
                keyword: keywordQuery,
                keywordType: keywordQueryType,
                content: contentQuery,
                contentType: contentQueryType,
                language: selectedLangId,
                booleanSearch: booleanSearchOpt,
                categoryId: this.categoryId,
                titleNot: titleNot,
                authorNot: authorNot,
                keywordNot: keywordNot,
                contentNot: contentNot,
            }
            this.ebookService.advancedSearch(advancedQuery).subscribe(ebooks => {
                this.ebooks = ebooks;
                this.ebookEmitter.emit(this.ebooks);
            });
        }
    }

    toggleExpand() {
        this.expanded = !this.expanded;
    }
}
