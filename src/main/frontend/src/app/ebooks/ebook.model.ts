import {Category} from "../categories/category.model";
import { User } from "../users/user.model";
import { Language } from "../languages/language.model";

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
    public user: User;
    public language: Language;
    public highlight?: string;

    constructor(
        title: string,
        author: string,
        publicationYear: number,
        category: Category,
        keywords: string,
        filename: string,
        thumbnailPath: string,
        mime: string,
        user: User,
        language: Language,
        highlight: string,
    ) {
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.keywords = keywords;
        this.thumbnailPath = thumbnailPath;
        this.mime = mime;
        this.category = category;
        this.filename = filename;
        this.user = user;
        this.language = language;
        this.highlight = highlight;
    }
}
