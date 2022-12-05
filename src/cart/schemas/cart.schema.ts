import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CartItem } from './cart-item.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
    @Prop({required: false})
    id: string;

    @Prop({required: true}) 
    userId: string;

    @Prop({required: true})
    products: CartItem[]

    @Prop({required: false})
    currency: string;

    @Prop({required: false})
    discount: string;

    @Prop({required: false})
    quantity: number;

}

export const CartSchema = SchemaFactory.createForClass(Cart);