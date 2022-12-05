import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { AddProductToCartDto } from './dto/add-product.dto';
import { UpdateProductQuantityDto } from './dto/update-quantity.dto';
import { CartItem } from './schemas/cart-item.schema';
import { Cart } from './schemas/cart.schema';

@Injectable()
export class CartService {
    constructor(@InjectModel('Cart') private readonly cartModel: Model<Cart>){}

    async findAll(user: User): Promise<Cart> {
        // find all products in a single cart for current user
        return await this.cartModel.findOne({userId: user.username})
    }

    async deleteAll(user: User): Promise<any> {
        // delete all products in a single cart for current user
        return await (await this.cartModel.findOne({userId: user.username})).delete()
    }
    
    async add(user: User, cart: AddProductToCartDto): Promise<any> {
        // add single product to cart for current user
        const quantity = cart.quantity == null ? 1 : cart.quantity;
        return await this.cartModel.create(
                { userId: user.username },
                { $push: { products: {productId: cart.productId, quantity: quantity } }, currency: 'usd' }
            ).catch((err) => (
                this.cartModel.findOneAndUpdate(
                { userId: user.username },
                { $push: { products:  {productId: cart.productId, quantity: quantity }}, currency: 'usd' }
            )))
    }

    async delete(user: User, id: string): Promise<Cart> {
        // delete single product from current user's cart
        // this may not be the most optimal way we'll improve later
        const cartDoc = await this.cartModel.findOne({userId: user.username});
        cartDoc.products = cartDoc.products.filter((item => item.productId != id))
        return await cartDoc.save();
        
    }

    async update(user: User, id: string, cart: UpdateProductQuantityDto): Promise<any> {
        // update the quantity of a product / item in cart for user
        // this may not be the most optimal way we'll improve later
        const cartDoc = await this.cartModel.findOne({userId: user.username});
        const update = cartDoc.products.filter((item) => item.productId == id).map((val, idx) => (
            {
                productId: val.productId = id,
                quantity: val.quantity = cart.quantity
            }
        ))
        cartDoc.products = Object.assign(cartDoc.products, {...update})
        return await cartDoc.save()
    }
}
