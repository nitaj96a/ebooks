import {Category} from "../categories/category.model";

export class Ebook {
    public id: number;
    public title: string;
    public author: string;
    public publicationYear: number;
    public keywords: string;
    public thumbnailPath: string;
    public filename: string;
    public mime: string;
    public category: Category;

    constructor(
        title: string,
        author: string,
        publicationYear: number,
        category: Category,
        keywords: string,
        filename: string,
        thumbnailPath: string,
        mime: string,
        
    ) {
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.keywords = keywords;
        this.thumbnailPath = thumbnailPath;
        this.mime = mime;
        this.category = category;
        this.filename = filename;
    }
}
