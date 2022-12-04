
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
const bcrypt = require('bcrypt')

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUserByUsername(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const saltRounds = 10;
    bcrypt.compare(user.password, saltRounds).then(function(result) {
      return result;
    });
    return null;
  }
  async validateUserByEmail(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    const saltRounds = 10;
    bcrypt.compare(user.password, saltRounds).then(function(result) {
      return result;
    });
    return null;
  }

  async login(user: LoginUserDto) {
    const payload = { username: user.username, password: user.password, email: user.email };
    let signUser = {}
    user.username !== null ? signUser = { username: payload.username, password: payload.password } : user.email !== null ? signUser =  { email: payload.email, password: payload.password } : null
    return {
      access_token: this.jwtService.sign({...user}),
    };
  }

  async signup(user: CreateUserDto) {
    const createdUser = await this.usersService.create(user)
    return {
    access_token: this.jwtService.sign({...createdUser}),
    };
  }

}