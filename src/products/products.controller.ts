import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from "./products.service";
import { Product } from './interfaces/product.interface';
import { UpdateProductDto } from './dto/update-product.dto';
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    @Get()
    findAll(): Promise<Product[]> {
        return this.productsService.findAll()
        
    }
    @Get(':id')
    findOne(@Param('id') id): Promise<Product> {
        return this.productsService.findOne(id)
    }
    @Post()
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<Product> {
        return this.productsService.delete(id);
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateProductDto, @Param('id') id): Promise<Product> {
        return this.productsService.update(id, updateProductDto)
    }
}
