import { Response, Get, Controller, Post, Put, HttpStatus, Param, Body, Delete, Req } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('api/movies')
export class MovieController {

  constructor(private readonly movieService: MovieService) { }

  @Get()
  async GetAllMovies(@Req() request, @Response() res: any) {
    try {
      const userID = request.payload.user.userID;
      let movies =  await this.movieService.GetAllMovies(userID);
      return res.status(HttpStatus.OK).json(movies);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get('favoriteId/:imdbID')
  async GetById(@Req() request, @Param('imdbID') imdbID: string, @Response() res: any) {
    try {
      const userID = request.payload.user.userID;
      let movie =  await this.movieService.GetById(imdbID, userID)
      return res.status(HttpStatus.OK).json(movie);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get('favoriteId/:byWord')
  async GetByWord(@Req() request, @Param('byWord') byWord: string, @Response() res: any) {
    try {
      const userID = request.payload.user.userID;
      let movies =  await this.movieService.GetByWord(byWord, userID)
      return res.status(HttpStatus.OK).json(movies);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  
  @Get('favoriteId/:title')
  async GetByTitle(@Req() request, @Param('title') title: string, @Response() res: any) {
    try {
      const userID = request.payload.user.userID;
      let movie =  await this.movieService.GetByTitle(title, userID)
      return res.status(HttpStatus.OK).json(movie);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  
  @Post()
  async AddMovie(@Req() request, @Body() body: any, @Response() res: any) {
    try {
      if (!body) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: "One of data is missing" });
      }
      const userID = request.payload.user.userID;
      let movie =  await this.movieService.AddMovie(body, userID);
      return res.status(HttpStatus.CREATED).json(movie);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Put(':imdbID')
  async UpdateUser(@Req() request, @Param('imdbID') imdbID: string, @Body() body: any, @Response() res: any) {
    try {
      const userID = request.payload.user.userID;
      body.imdbID=imdbID;
      let movie =  await this.movieService.UpdateMovie(body, userID);
      return res.status(HttpStatus.OK).json(movie);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Delete(':imdbID')
  async DeleteUser(@Req() request, @Param('imdbID') imdbID: string, @Response() res: any) {
    try {
      const userID = request.payload.user.userID;
      let movie =  await this.movieService.DeleteMovie(imdbID, userID);
      return res.status(HttpStatus.NO_CONTENT).json(movie);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}