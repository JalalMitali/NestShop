import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { Users } from './users/users';
import { ProductsModule } from './products/products.module'
import config from './config/keys'
@Module({
  imports: [MongooseModule.forRoot(config.mongoURI), ProductsModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, Users],
})
export class AppModule {}
