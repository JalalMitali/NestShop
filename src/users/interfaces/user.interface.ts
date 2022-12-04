export interface User {
    id?: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly isEmailVerified: boolean;
    readonly dateCreated: number;
};