export interface UpdatePasswordDto {
    readonly email: string;
    readonly password: string;
    readonly newPassword: string;
};