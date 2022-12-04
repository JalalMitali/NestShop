import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dto/add-product.dto';
import { UpdateProductQuantityDto } from './dto/update-quantity.dto';
import { Cart } from './schemas/cart.schema';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Request() req): Promise<Cart> {
        return this.cartService.findAll(req.user)
        
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteAll(@Request() req): Promise<Cart> {
        return this.cartService.deleteAll(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    add(@Body() addProduct: AddProductToCartDto, @Request() req): Promise<Cart> {
        return this.cartService.add(req.user, addProduct);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id, @Request() req): Promise<Cart> {
        return this.cartService.delete(req.user, id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateQuantity(@Request() req, @Body() updateProductQuantity: UpdateProductQuantityDto, @Param('id') id): Promise<Cart> {
        return this.cartService.update(req.user, id, updateProductQuantity)
    }
    
}
