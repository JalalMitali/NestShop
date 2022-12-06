
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  /* async validateUserByUsername(user: LoginUserDto): Promise<any> {
    const auth = await this.usersService.findOneByUsername(user.username);
    const saltRounds = 10;
    bcrypt.compare(auth.password, user.password, saltRounds).then(function(result) {
      return result
    });
    return null;
  }
  async validateUserByEmail(user: LoginUserDto): Promise<any> {
    const auth = await this.usersService.findOneByEmail(user.email);
    const saltRounds = 10;
    bcrypt.compare(auth.password, user.password, saltRounds).then(function(result) {
      console.log(result);
      return result
    });
    return null;
  } */

  async validateUser(user: JwtPayload): Promise<any> {
    const auth = await this.usersService.findSingleUser(user);
    if(auth == null) {
      return null;
    }
    
    return bcrypt.compare(user.password, auth.password).then(function(result) {
      if(!result) return result;
      return auth;
    });
  }

  async login(user: LoginUserDto) {
    return {
      access_token: this.jwtService.sign({...user}),
    };
  }

  async signup(user: CreateUserDto) {
    const createdUser = await this.usersService.create({...user})
    return {
    access_token: this.jwtService.sign({...createdUser}),
    };
  }
}