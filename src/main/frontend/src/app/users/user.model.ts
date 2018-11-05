export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public type: string;
    public category: string;

    constructor(firstName: string, lastName: string, userName: string, type:string, category: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = userName;
        this.type = type;
        this.category = category;
    }
}