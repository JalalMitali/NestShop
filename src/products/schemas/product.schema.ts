import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({required: false})
    id: string;

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop({required: true})
    image: string;

    @Prop({required: true})
    tags: string[];
    
    @Prop({required: true})
    slug: string;

    @Prop({required: true})
    quantity: number;

    @Prop({required: true})
    price: number;

    @Prop({required: true})
    categories: string[];

    @Prop({required: true})
    added: number;

}

export const ProductSchema = SchemaFactory.createForClass(Product);