import { Module } from '@nestjs/common';;
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart, CartSchema } from './schemas/cart.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Cart', schema: CartSchema}])],
  controllers: [CartController],
  providers: [CartService, Cart],
})
export class CartModule {}