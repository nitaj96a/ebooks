import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../categories/category.service';
import { FormGroup } from '@angular/forms';
import { Category } from './../../categories/category.model';
import { Component, OnInit } from '@angular/core';
import { Ebook } from '../ebook.model';
import { EbookService } from '../ebook.service';

@Component({
  selector: 'app-ebooks-edit',
  templateUrl: './ebooks-edit.component.html',
  styleUrls: ['./ebooks-edit.component.css']
})
export class EbooksEditComponent implements OnInit {
  categories: Category[];
  editEbookForm: FormGroup;
  ebook:Ebook;
  category: Category;
  ebookId: Number;
  fileSelected: boolean;
  file: File;
  filename: String;
  uploadedFile: boolean;
  imgFile: File;

  imgURL: any;

  constructor(
    private ebookService: EbookService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(
      (categories: any[]) => {
          //console.log(categories);
          this.categories = categories;
      },
      error => console.log(error)
  );
    this.editEbookForm = new FormGroup({
      inputTitle: new FormControl(null, Validators.required),
      inputAuthor: new FormControl(null, Validators.required),
      inputYear: new FormControl(null),
      inputCategory: new FormControl(),
      inputKeywords: new FormControl(),
      inputThumbnail: new FormControl(),
      inputFile: new FormControl(),
    });

    this.route.params.subscribe(params => {
      //console.log(params);
      this.ebookId = Number.parseInt(params['id']);
      
    });
    //console.log(this.ebookId);
    this.ebookService.getEbook(this.ebookId).subscribe(
      (ebook: Ebook) => {
        this.ebook = ebook;
        this.editEbookForm.controls.inputTitle.setValue(this.ebook.title);
        this.editEbookForm.controls.inputAuthor.setValue(this.ebook.author);
        this.editEbookForm.controls.inputYear.setValue(this.ebook.publicationYear);
        this.editEbookForm.controls.inputKeywords.setValue(this.ebook.keywords);
        //this.editEbookForm.controls.inputThumbnail.setValue(this.ebook.thumbnailPath);
        this.imgURL = 'http://localhost:8080/ebook-thumbnails/' + this.ebook.thumbnailPath;
        this.editEbookForm.controls.inputCategory.setValue(this.ebook.category);
        this.editEbookForm.controls.inputCategory.setValue(this.ebook.category.id);
      },
      (error) => console.log(error)
    );
    // this.ebook.filename
  }

  ebookFileChange(event) { 
    this.fileSelected = true;
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    this.file = file;
    console.log(this.file);
    // if(event.target.files.length > 0) {
    //     let file = event.target.files[0];
    //     this.uploadFileForm.get('inputFile').setValue(file);
    // }
}

uploadFile() {
  console.log(this.file);
  this.ebookService.reuploadEbookFile(this.file, this.ebook.id)
      .subscribe((ebook: Ebook) => {
          this.ebook = ebook;
          this.filename = ebook.filename;
          console.log(this.filename);
          console.log(this.ebook);
          this.editEbookForm.controls.inputTitle.setValue(ebook.title);
          this.editEbookForm.controls.inputAuthor.setValue(ebook.author);
          this.editEbookForm.controls.inputKeywords.setValue(ebook.keywords);
          this.uploadedFile = true;
          this.fileSelected = false;

      },
      (error) => console.log(error)
  );
}

  preview(files: FileList) {
    console.log('in change');
    console.log(files);
    var reader = new FileReader();

    this.imgFile = files[0];
    console.log(this.imgFile);
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      console.log(this.imgURL);
    }

  }

  onSubmit() {
    let title: string = this.editEbookForm.controls.inputTitle.value;
    let author: string = this.editEbookForm.controls.inputAuthor.value;
    let year: number = Number(this.editEbookForm.controls.inputYear.value);
    let categoryId = Number(this.editEbookForm.controls.inputCategory.value);
    this.category = this.categories.filter(x => x.id == categoryId)[0];
    console.log("chosen category id: "+ categoryId);
    let keywords: string = this.editEbookForm.controls.inputKeywords.value;
    let filename: string = this.editEbookForm.controls.inputFile.value;
    filename = filename.split('\\')[2];
    //filename.s //strip(C:\fakepath\)
    let thumbnailPath = this.editEbookForm.controls.inputThumbnail.value;
    thumbnailPath = thumbnailPath.split('\\')[2];

    //start uploading files

  }
}
