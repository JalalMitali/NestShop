import { Role } from "src/auth/enums/role.enum";

export interface User {
    readonly id?: string;
    readonly username: string;
    readonly email: string;
    readonly rules: Role[];
    readonly password: string;
    readonly isEmailVerified: boolean;
    readonly dateCreated: number;
};