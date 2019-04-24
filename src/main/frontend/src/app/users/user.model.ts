export class User {
    public id: number;
    public firstName?: string;
    public lastName?: string;
    public username?: string;
    public type?: string;
    public category?: string;
    public token?: string;

    constructor(firstName: string, lastName: string, userName: string, type: string, category: string, token: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = userName;
        this.type = type;
        this.category = category;
        this.token = token;
    }
}
