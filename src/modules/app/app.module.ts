import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from 'modules/movie/movie.module';
import { MovieExtendModule } from 'modules/movieextend/movie-extend.module';
import { UserModule } from 'modules/user/user.module';
import { ImdbModule } from 'modules/imdb/imdb.module';
import { AuthModule } from 'modules/auth/auth.module';
import { TokenMiddleware } from 'middleware/token.middleware';
import { Connection } from 'typeorm';

@Module({
  imports: [UserModule, MovieExtendModule, ImdbModule, MovieModule, AuthModule, TypeOrmModule.forRoot() ],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware);
  }
}
