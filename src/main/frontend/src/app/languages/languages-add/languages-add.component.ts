import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Language } from '../language.model';
import { LanguagesService } from '../languages.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-languages-add',
    templateUrl: './languages-add.component.html',
    styleUrls: ['./languages-add.component.css']
})
export class LanguagesAddComponent implements OnInit {
    addLanguageForm: FormGroup;
    language: Language;
    id: number;

    constructor(
        private languageService: LanguagesService,
        private router: Router,
        private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.addLanguageForm = this.fb.group({
            inputName: ['', Validators.required]
        });
    }

    onSubmit() {
        const name: string = this.addLanguageForm.controls.inputName.value;
        this.language = {name: name, id: null};
        this.languageService.create(this.language).subscribe(() => {
            this.router.navigateByUrl('/languages');
        });
    }

}
