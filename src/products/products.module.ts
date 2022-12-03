import { Module } from '@nestjs/common';
import { ProductSchema } from './schemas/product.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Products } from './products';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])],
  controllers: [ProductsController],
  providers: [ProductsService, Products],
})
export class ProductsModule {}
