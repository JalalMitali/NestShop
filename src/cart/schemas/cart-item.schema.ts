import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<CartItem>;

@Schema()
export class CartItem {
    @Prop({required: true})
    id: string;

    @Prop({required: true})
    productId: string;

    @Prop({required: false}) 
    quantity: number;

}

export const CartSchema = SchemaFactory.createForClass(CartItem);