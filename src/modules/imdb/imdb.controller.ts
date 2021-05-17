import { Response, Get, Controller, HttpStatus, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'guards/jwtAuthGuard';
import { ImdbService } from './imdb.service';

@Controller('api/movies')
export class ImdbController { 

  constructor(private readonly imdbService: ImdbService) { }

  @UseGuards(JwtAuthGuard)
  @Get('imdbWord/:byWord')
  async GetImdbByWord(@Req() request, @Param('byWord') byWord: string, @Response() res: any) {
    try {
      const userImdbPass = request.payload.user.userImdbPass;
      const userID = request.payload.user.userID;
      let movies = await this.imdbService.GetImdbByWord(userImdbPass, userID, byWord);
      return res.status(HttpStatus.OK).json(movies);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('imdbId/:imdbID')
  async GetImdbById(@Req() request, @Param('imdbID') imdbID: string, @Response() res: any) {
    try {
      const userImdbPass = request.payload.user.userImdbPass;
      const userID = request.payload.user.userID;
      let movies = await this.imdbService.GetImdbById(userImdbPass, userID, imdbID);
      return res.status(HttpStatus.OK).json(movies);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('imdbTitle/:movieTitle')
  async GetImdbByTitle(@Req() request, @Param('movieTitle') movieTitle: string, @Response() res: any) {
    try {
      const userImdbPass = request.payload.user.userImdbPass;
      const userID = request.payload.user.userID;
      let movies = await this.imdbService.GetImdbByTitle(userImdbPass, userID, movieTitle);
      return res.status(HttpStatus.OK).json(movies);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}