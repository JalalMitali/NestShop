import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from "./products.service";
import { Product } from './interfaces/product.interface';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
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

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto);
    }

    @Roles(Role.Admin)
    @Delete(':id')
    delete(@Param('id') id): Promise<Product> {
        return this.productsService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('')
    deleteAll(): Promise<Product> {
        return this.productsService.deleteAll();
    }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(@Body() updateProductDto: UpdateProductDto, @Param('id') id): Promise<Product> {
        return this.productsService.update(id, updateProductDto)
    }
}
