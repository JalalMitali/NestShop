export class UpdateProductDto {
    readonly title?: string;
    readonly description?: string;
    readonly image?: string[];
    readonly tags?: string[];
    readonly slug?: string;
    readonly quantity?: number;
    readonly price?: number;
    readonly categories?: string[];
    readonly added?: number;
}