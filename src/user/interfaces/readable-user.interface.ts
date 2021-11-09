export interface IReadableUser {
    readonly email: string;
    readonly lastName: string;
    readonly firstName: string;
    accessToken?: string;
}