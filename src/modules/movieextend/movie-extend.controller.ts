import { Response, Get, Controller, Post, Put, HttpStatus, Param, Body, Delete, Req, UseGuards } from '@nestjs/common';
import { MovieExtendDto } from 'entities-for-validation/MovieExtendDto';
import { JwtAuthGuard } from 'guards/jwtAuthGuard';
import { MovieExtendService } from './movie-extend.service';

@Controller('api/movies')
export class MovieExtendController {

  constructor(private readonly movieExtendService: MovieExtendService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async GetAllMovies(@Req() request, @Response() res: any) {
    try {
      const userID = request.payload.user.userID;
      let movies =  await this.movieExtendService.GetAllMovies(userID);
      return res.status(HttpStatus.OK).json(movies);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('favoriteId/:imdbID')
  async GetById(@Req() request, @Param('imdbID') imdbID: string, @Response() res: any) {
    try {
      const userID = request.payload.user.userID;
      let movie =  await this.movieExtendService.GetById(imdbID, userID)
      return res.status(HttpStatus.OK).json(movie);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('favoriteWord/:byWord')
  async GetByWord(@Req() request, @Param('byWord') byWord: string, @Response() res: any) {
    try {
      const userID = request.payload.user.userID;
      let movies =  await this.movieExtendService.GetByWord(byWord, userID)
      return res.status(HttpStatus.OK).json(movies);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('favoriteTitle/:title')
  async GetByTitle(@Req() request, @Param('title') title: string, @Response() res: any) {
    try {
      const userID = request.payload.user.userID;
      let movie =  await this.movieExtendService.GetByTitle(title, userID)
      return res.status(HttpStatus.OK).json(movie);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async AddMovie(@Req() request, @Body() body: MovieExtendDto, @Response() res: any) {
    try {
      if (!body) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: "One of data is missing" });
      }
      const userID = request.payload.user.userID;
      let movie =  await this.movieExtendService.AddMovie(body, userID);
      return res.status(HttpStatus.CREATED).json(movie);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':imdbID')
  async UpdateUser(@Req() request, @Param('imdbID') imdbID: string, @Body() body: MovieExtendDto, @Response() res: any) {
    try {
      const userID = request.payload.user.userID;
      body.imdbID=imdbID;
      let movie =  await this.movieExtendService.UpdateMovie(body, userID);
      return res.status(HttpStatus.OK).json(movie);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':imdbID')
  async DeleteUser(@Req() request, @Param('imdbID') imdbID: string, @Response() res: any) {
    try {
      const userID = request.payload.user.userID;
      let movie =  await this.movieExtendService.DeleteMovie(imdbID, userID);
      return res.status(HttpStatus.NO_CONTENT).json(movie);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}