import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.userModel.findOne(user => user.username === username);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.userModel.findOne(user => user.email === email);
    }

    async create(user: CreateUserDto): Promise<User> {
        const saltRounds = 10;
        return bcrypt.hash(user.password, saltRounds).then(async (hash) => {
            const item = {
                ...user,
                ...{password: hash}
            }
            const saveUser = new this.userModel(item)
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