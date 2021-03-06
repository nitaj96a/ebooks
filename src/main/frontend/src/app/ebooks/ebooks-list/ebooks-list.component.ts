import { User } from './../../users/user.model';
import { AuthenticationService } from './../../auth/_services/authentication.service';
import {Component, OnInit, Input} from "@angular/core";
import {Ebook} from "../ebook.model";
import {EbookService} from "../ebook.service";
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/categories/category.service';
import { Category } from 'src/app/categories/category.model';

@Component({
    selector: "app-ebooks-list",
    templateUrl: "./ebooks-list.component.html",
    styleUrls: ["./ebooks-list.component.css"]
})
export class EbooksListComponent implements OnInit {
    catId: number;
    category
    ebooks: Ebook[] = [];
    allEbooks: Ebook[] = [];
    currentUser: User;
    images: Map<number, any> = new Map<number, any>();
    imagesToShow: Map<number, any> = new Map<number, any>();

    @Input() ebookResults: Ebook[];

    constructor(
        private ebookService: EbookService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        private router: Router,
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.catId = params['catId'];
            if (this.catId) {
                this.catId = this.catId;
                this.categoryService.getCategoryById(this.catId).subscribe((c: Category) => {
                    this.category = c;
                    if (this.category) {
                        this.ebookService.getEbooksByCategory(this.catId).subscribe(
                            (ebooks: any[]) => {
                                this.ebooks = ebooks;
                                this.allEbooks = ebooks;
                            }, error => console.log(error),
                            () => {
                                this.downloadCovers();
                            }
                        );
                    } else {
                        this.router.navigateByUrl('/ebooks');
                    }
                    
                });
            } else {
                this.ebookService.getEbooks()
                .subscribe(
                (ebooks: any[]) => {
                    this.ebooks = ebooks;
                    this.allEbooks = ebooks;
                },
                (error) => console.log(error),
                () => {
                    this.downloadCovers();
                },
            );
            }
        });
    }

    downloadCovers() {
        this.ebooks.forEach(ebook => {
            this.ebookService.downloadEbookThumbnail(ebook.id).subscribe(thumb => {
                this.createImageFromBlob(thumb, ebook.id);
                //console.log(thumb);
                //this.images.set(ebook.id, thumb);
            });
        });
    }

    createImageFromBlob(image: Blob, id: number) {
        let reader = new FileReader();
        reader.addEventListener("load", () => {
            this.imagesToShow.set(id, reader.result);
            //console.log(this.imagesToShow);
        });

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    getCategoryById(id: number) {
        console.log(id);
    }

    download(idStr: string, mime: string) {
        let id = Number(idStr);
        this.ebookService.downloadEbookFile(id, mime);
    }

    delete(id: number) {
        console.log('in delete ' + id);
        return this.ebookService.deleteEbook(id).subscribe(() => {
            for (let i = 0; i < this.ebooks.length; i++) {
                if (this.ebooks[i].id === id) {
                  this.ebooks.splice(i, 1);
                }
              }
        });
    }

    updateEbooks(ebooks: Ebook[]) {
        if (ebooks.length == 0) {
            var empty : Ebook[] = [];
            this.ebooks = empty;
            return;
        } else {
            if (ebooks[0].id == -1) {
                this.ebooks = this.allEbooks;
                return;
            }
            this.ebooks = ebooks;
            console.log(this.ebooks);
        }
    }
}
