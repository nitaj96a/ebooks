export class Ebook {
    public id: number;
    public title: string;
    public author: string;
    public publicationYear: number;
    public keywords: string;
    public thumbnailPath: string;
    public mime: string;

    constructor(
        title: string,
        author: string,
        publicationYear: number,
        keywords: string,
        thumbnailPath: string,
        mime: string
    ) {
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.keywords = keywords;
        this.thumbnailPath = thumbnailPath;
        this.mime = mime;
    }
}
