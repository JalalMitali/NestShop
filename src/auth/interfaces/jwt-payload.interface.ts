export interface JwtPayload {
    readonly password: string;
    readonly username?: string;
    readonly email?: string;
    readonly iat: number;
    readonly exp: number;
}