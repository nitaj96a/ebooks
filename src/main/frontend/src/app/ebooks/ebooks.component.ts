import {Component, OnInit, ViewChild} from '@angular/core';
import { Ebook } from './ebook.model';
import { EbooksListComponent } from './ebooks-list/ebooks-list.component';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../categories/category.service';
import { Category } from '../categories/category.model';
import { User } from '../users/user.model';
import { AuthenticationService } from '../auth/_services/authentication.service';

@Component({
    selector: 'app-ebooks',
    templateUrl: './ebooks.component.html',
    styleUrls: ['./ebooks.component.css']
})
export class EbooksComponent implements OnInit {
    catId: number;
    category: Category;
    ebooks: Ebook[] = [];
    currentUser: User;
    @ViewChild(EbooksListComponent)
    private ebooksListComponent: EbooksListComponent;

    constructor(
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private authService: AuthenticationService,
        ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.catId = params['catId'];
            if (this.catId ) {
                this.categoryService.getCategoryById(this.catId).subscribe((c: Category) => {
                    this.category = c;
                });
            }
        });
        this.authService.currentUser.subscribe(x => this.currentUser = x);
    }

    updateEbookList(ebooks: Ebook[]) {
        this.ebooks = ebooks;
        this.ebooksListComponent.updateEbooks(this.ebooks);
    }
}
