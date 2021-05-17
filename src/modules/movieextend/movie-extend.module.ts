import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieExtend } from 'entities/MovieExtend';
import { MovieExtendController } from './movie-extend.controller';
import { MovieExtendService } from './movie-extend.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieExtend])],
  controllers: [MovieExtendController],
  providers: [MovieExtendService],
  exports: [MovieExtendService]
})
export class MovieExtendModule {}
