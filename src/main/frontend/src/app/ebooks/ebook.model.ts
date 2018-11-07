export class Ebook {
    public id: number;
    public title: string;
    public author: string;
    public publicationYear: number;
    public keywords: string;
    public thumbnailPath: string;
    public MIME: string;

    constructor(
        title: string,
        author: string,
        publicationYear: number,
        keywords: string,
        thumbnailPath: string,
        MIME: string
    ) {
        this.title = title;
        this.author = author;
        this.publicationYear = publicationYear;
        this.keywords = keywords;
        this.thumbnailPath = thumbnailPath;
        this.MIME = MIME;
    }
}
