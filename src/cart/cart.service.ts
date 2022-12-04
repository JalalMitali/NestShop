import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { AddProductToCartDto } from './dto/add-product.dto';
import { RemoveProductFromCartDto } from './dto/remove-product.dto';
import { UpdateProductQuantityDto } from './dto/update-quantity.dto';
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
        return await this.cartModel.findOneAndUpdate(
            { userId: user.username },
            { $push: { products: { [cart.productId]: cart.quantity },}, currency: 'usd' }
        ).then(async (result) => {
            return result !== null ? result : await this.cartModel.create({ userId: user.username } ,{ $push: { products: { [cart.productId]: cart.quantity }}, currency: 'usd' })
        })
    }

    async delete(user: User, removeProductDto: RemoveProductFromCartDto): Promise<Cart> {
        // delete single product from current user's cart
        return await this.cartModel.findOneAndUpdate(
            { userId: user.username },
            { products: {$pull: { [removeProductDto.productId]: removeProductDto.productId, quantity: 0}, quantity: 0}.$pull }
          );

    }

    async update(user: User, id: string, cart: UpdateProductQuantityDto): Promise<Cart> {
        // update the quantity of a product / item in cart for user
        return await this.cartModel.findOneAndUpdate(
            { userId: user.username },
            { $push: { products: { [cart.productId]: cart.quantity }} }
          );
    }
}
