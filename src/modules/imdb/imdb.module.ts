import { Module } from '@nestjs/common';
import { ImdbController } from './imdb.controller';
import { ImdbService } from './imdb.service';

@Module({
  imports: [],
  controllers: [ImdbController],
  providers: [ImdbService],
  exports: [ImdbService]
})
export class ImdbModule {}
