
export class User {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private phone: string,
        private password: string,

    ) { }

    public getId = () => this.id
    public getName = () => this.name
    public getEmail = () => this.email
    public getPhone = () => this.phone
    public getPassword = () => this.password



    static toUserModel(user: any) {
        return new User(user.id, user.name, user.email, user.phone, user.password);
    }
}

export interface UserInputDTO {
    email: string;
    password: string;
    name: string;
    phone: string;
}

export interface LoginInputDTO {
    email: string;
    password: string;
}

