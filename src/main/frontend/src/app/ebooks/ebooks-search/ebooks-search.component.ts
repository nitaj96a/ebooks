import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";

@Component({
  selector: 'app-ebooks-search',
  templateUrl: './ebooks-search.component.html',
  styleUrls: ['./ebooks-search.component.css']
})
export class EbooksSearchComponent implements OnInit {

  searchEbookForm: FormGroup;

  constructor() { }

  ngOnInit() {

    this.searchEbookForm = new FormGroup({
      
    });
  }

}
