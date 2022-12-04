import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({required: false})
    id: string;

    @Prop({required: true})
    username: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    dateCreated: number;
    
    @Prop({required: true})
    isEmailVerified: boolean;


}

export const UserSchema = SchemaFactory.createForClass(User);