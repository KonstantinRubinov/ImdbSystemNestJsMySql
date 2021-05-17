import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenMiddleware implements NestMiddleware {

    constructor( private jwtService: JwtService ) {}

    use(req:any) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          const token = req.headers.authorization.split(' ')[1];
          try {
            let payload = this.jwtService.verify(token);
            req.payload = payload;
          } catch (error) {
            throw Error(error);
          }
        } else {
          throw Error('The access token is not valid.');
        }
    }
}
