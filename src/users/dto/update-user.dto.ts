export interface UpdateUserDto {
    readonly username: string;
    readonly email: string;
    readonly isEmailVerified: boolean;
    readonly dateCreated: number;
};