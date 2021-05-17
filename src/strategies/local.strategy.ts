import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { AuthService } from 'modules/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userNickName: string, userPassword: string): Promise<any> {
    const user = await this.authService.validateUser(userNickName, userPassword);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}