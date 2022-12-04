import { Product } from "src/products/schemas/product.schema";

export interface ShoppingCart {
    readonly products: Product[];
    readonly discount : string;
    readonly currency: string;
}