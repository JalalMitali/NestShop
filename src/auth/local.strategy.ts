import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userId: string, password: string): Promise<any> {
    let user = await this.authService.validateUserByUsername(userId, password);
    if (!user) {
        user = await this.authService.validateUserByEmail(userId, password)
        if(!user) {
            throw new UnauthorizedException();
        }
    }
    return user;
  }
}