import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Language } from '../language.model';
import { LanguagesService } from '../languages.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-languages-edit',
  templateUrl: './languages-edit.component.html',
  styleUrls: ['./languages-edit.component.css']
})
export class LanguagesEditComponent implements OnInit {
  editLanguageForm: FormGroup;
  language: Language;
  id: number;

  constructor(
    private languageService: LanguagesService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.languageService.getOne(this.id).subscribe(lang => {
          this.language = lang;
          this.editLanguageForm.controls.inputName.setValue(lang.name);
        });
      }
    });
  }

  onSubmit() {
    const name: string = this.editLanguageForm.controls.inputName.value;
    this.language.name = name;
    this.languageService.update(this.language).subscribe(() => {
      this.router.navigateByUrl('/languages');
    });
  }

  createForm() {
    this.editLanguageForm = this.fb.group({
      inputName: ['', Validators.required]
    });
  }
}
