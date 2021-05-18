import { Injectable } from '@nestjs/common';
import { Movie } from '../../entities/Movie';
import { EntityManager } from 'typeorm';


@Injectable()
export class MovieService {
    constructor(private readonly em: EntityManager) { }

    async GetAllMovies(userID:string){
      try {
        const movie = await this.em.createQueryBuilder(Movie, 'movie')
        .where("movie.userID = :userID", { userID: userID })
        .getMany();
        return movie;
      } catch (error) {
        throw Error(error);
      }
    }

    async GetById(imdbID:string, userID:string){
      try {
        const movie = await this.em.createQueryBuilder(Movie, 'movie')
        .where("movie.userID = :userID", { userID: userID })
        .andWhere("movie.imdbID = :imdbID", { imdbID: imdbID })
        .getOne();
        return movie;
      } catch (error) {
        throw Error(error);
      }
    }

    async GetByWord(byWord:string, userID:string){
      try {
        const movies = await this.em.createQueryBuilder(Movie, 'movie')
        .where("movie.userID = :userID", { userID: userID })
        .andWhere("movie.title like :title", { title:`%${byWord}%` })
        .getMany();
        return movies;
      } catch (error) {
        throw Error(error);
      }
    }

    async GetByTitle(title:string, userID:string){
      try {
        const movie = await this.em.createQueryBuilder(Movie, 'movie')
        .where("movie.userID = :userID", { userID: userID })
        .andWhere("movie.title = :title", { title: title })
        .getOne();
        return movie;
      } catch (error) {
        throw Error(error);
      }
    }

    async AddMovie(body:Movie, userID:string){
      try {
        const movie = new Movie(body.imdbID, body.title, body.poster, userID, body.year);
        return await this.em.createQueryBuilder(Movie, 'movie')
        .insert()
        .select('*')
        .where("imdbID = :imdbID", { imdbID: body.imdbID })
        .andWhere("userID = :userID", { userID: userID })
        .getOne();
      } catch (error) {
        throw Error(error);
      }
    };

    async UpdateMovie(body:Movie, userID:string){
      try {
          var movie = await this.em.createQueryBuilder(Movie, 'movie')
          .update(body)
          .where("imdbID = :imdbID", { imdbID: body.imdbID })
          .andWhere("userID = :userID", { userID: userID })
          .select('*')
          .where("imdbID = :imdbID", { imdbID: body.imdbID })
          .andWhere("userID = :userID", { userID: userID })
          .getOne();
          return movie;
      } catch (error) {
          throw Error(error);
      }
    }
    
    async DeleteMovie(imdbID, userID){
      try {
        let deletedMovie = await this.em.createQueryBuilder(Movie, 'movie')
        .delete()
        .from(Movie)
        .where("imdbID = :imdbID", { imdbID: imdbID })
        .andWhere("userID = :userID", { userID: userID })
        .execute();
        let affected=0;
        if (deletedMovie.affected!=undefined && deletedMovie.affected!=null){
          affected=deletedMovie.affected;
        }
        return affected;
      } catch (error) {
        throw Error(error);
      }
    }

    async DeleteMoviesByUser(userID){
      try {
        let deletedMovie = await this.em.createQueryBuilder(Movie, 'movie')
        .delete()
        .from(Movie)
        .andWhere("userID = :userID", { userID: userID })
        .execute();
        let affected=0;
        if (deletedMovie.affected!=undefined && deletedMovie.affected!=null){
          affected=deletedMovie.affected;
        }
        return affected;
      } catch (error) {
        throw Error(error);
      }
    }

    async DeleteMovies(){
      try {
        let deletedMovie = await this.em.createQueryBuilder(Movie, 'movie')
        .delete()
        .from(Movie)
        .execute();
        let affected=0;
        if (deletedMovie.affected!=undefined && deletedMovie.affected!=null){
          affected=deletedMovie.affected;
        }
        return affected;
      } catch (error) {
        throw Error(error);
      }
    }
}