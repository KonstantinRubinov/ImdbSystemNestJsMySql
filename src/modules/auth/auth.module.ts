import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserModule } from 'modules/user/user.module';
import { LocalStrategy } from 'strategies/local.strategy';
import { JwtStrategy } from 'strategies/jwt.strategy';
import { LoginController } from './login.controller';

@Module({
  imports: [
    UserModule,
    PassportModule.register({defaultStrategy: 'bearer'}),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [LoginController],
  exports: [AuthService],
})
export class AuthModule {}