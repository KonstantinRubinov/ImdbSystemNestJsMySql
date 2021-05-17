import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'entities/User';
import { UserService } from 'modules/user/user.service';

@Injectable()
export class AuthService {

  constructor( private userService: UserService, private jwtService: JwtService ) {}

  async validateUser(userNickName: string, userPassword: string): Promise<any> {
    const user = await this.userService.ReturnUserByNamePassword(userNickName, userPassword);
    if (user && user.userNickName === userNickName && user.userPassword === userPassword) {
      const { userNickName, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { userNickName: user.userNickName, userImdbPass: user.userImdbPass, userID: user.userID };
    return {
        usertoken: this.jwtService.sign(payload),
    };
  }
}