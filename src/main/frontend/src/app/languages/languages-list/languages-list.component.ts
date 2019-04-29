import {Component, OnInit} from '@angular/core';
import { Language } from '../language.model';
import { LanguagesService } from '../languages.service';

@Component({
    selector: 'app-languages-list',
    templateUrl: './languages-list.component.html',
    styleUrls: ['./languages-list.component.css']
})
export class LanguagesListComponent implements OnInit {
    languages: Language[];

    constructor(private languageService: LanguagesService) {
    }

    ngOnInit() {
        this.languageService.getLanguages().subscribe(languages => {
            this.languages = languages;
        });
    }

    delete(id: number) {
        this.languageService.delete(id).subscribe(() => {
            for (let i = 0; i < this.languages.length; i++) {
                if (this.languages[i].id === id) {
                    this.languages.splice(i, 1);
                }
            }
        });
    }

}
