import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { Roles } from 'src/auth/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
const bcrypt = require('bcrypt')

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {
        this.create = this.create.bind(this)
    }

    async findSingleUser(user: JwtPayload): Promise<User | undefined> { 
        
        return user.username == null ? await this.findOneByEmail(user.email) : await this.findOneByUsername(user.username)  
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.userModel.findOne({ username: username });
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne({ email: email });
    }

    async create(user: CreateUserDto): Promise<User> {
        const saltRounds = 10;
        return bcrypt.hash(user.password, saltRounds).then(async (hash) => {
            const item = {
                ...user,
                ...{password: hash}
            }
            const saveUser = new this.userModel({...item, roles: [Role.User]})
            return await saveUser.save()
            // Store hash in your password DB.
        });
    }

    async delete(id: string): Promise<User> {
        return await this.userModel.findByIdAndRemove(id)
    }

    async update(id: string, user: UpdateUserDto): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, {new: true})
    }

    async updatePassword(user: UpdatePasswordDto): Promise<User> {
        return await this.userModel.findOneAndUpdate((dbUser) => dbUser.email == user.email, {new: true})
    }

}