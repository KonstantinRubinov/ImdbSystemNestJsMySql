import { Injectable } from '@nestjs/common';
import { MovieExtend } from '../../entities/MovieExtend';
import { EntityManager } from 'typeorm';

@Injectable()
export class MovieExtendService {
    constructor(private readonly em: EntityManager) { }

    async GetAllMovies(userID:string){
      try {
        const movieExtends = await this.em.createQueryBuilder(MovieExtend, 'movieExtend')
        //.innerJoin("movieExtend.movie", "movie")
        .where("movieExtend.userID = :userID", { userID: userID })
        .getMany();
        return movieExtends;
      } catch (error) {
        throw Error(error);
      }
    }

    async GetById(imdbID:string, userID:string){
      try {
        const movieExtend = await this.em.createQueryBuilder(MovieExtend, 'movieExtend')
        //.innerJoin("movieExtend.movie", "movie")
        .where("movieExtend.userID = :userID", { userID: userID })
        .andWhere("movieExtend.imdbID = :imdbID", { imdbID: imdbID })
        .getOne();
        return movieExtend;
      } catch (error) {
        throw Error(error);
      }
    }

    async GetByWord(byWord:string, userID:string){
      try {
        const movieExtends = await this.em.createQueryBuilder(MovieExtend, 'movieExtend')
        //.innerJoin("movieExtend.movie", "movie")
        .where("movieExtend.userID = :userID", { userID: userID })
        .andWhere("movieExtend.title like :title", { title:`%${byWord}%` })
        .getMany();
        return movieExtends;
      } catch (error) {
        throw Error(error);
      }
    }

    async GetByTitle(title:string, userID:string){
      try {
        const movieExtend = await this.em.createQueryBuilder(MovieExtend, 'movieExtend')
        //.innerJoin("movieExtend.movie", "movie")
        .where("movieExtend.userID = :userID", { userID: userID })
        .andWhere("movieExtend.title = :title", { title: title })
        .getOne();
        return movieExtend;
      } catch (error) {
        throw Error(error);
      }
    }

    async AddMovie(body:MovieExtend, userID:string){
      try {
        const movie = new MovieExtend(body.imdbID, body.title, body.plot, body.website, body.rated, body.imdbRating, body.seen, body.poster, userID, body.year);
        return await this.em.createQueryBuilder(MovieExtend, 'movieExtend')
        .insert()
        .execute()
        .then((response) => {
          return response.raw[0];
        });
      } catch (error) {
        throw Error(error);
      }
    };

    async UpdateMovie(body:MovieExtend, userID:string){
      try {
          var movie = await this.em.createQueryBuilder(MovieExtend, 'movieExtend')
          .update(body)
          .where("imdbID = :imdbID", { imdbID: body.imdbID })
          .andWhere("userID = :userID", { userID: userID })
          .execute()
          .then((response) => {
            return response.raw[0];
          });
          return movie;
      } catch (error) {
          throw Error(error);
      }
    }
    
    async DeleteMovie(imdbID, userID){
      try {
        let deletedMovie = await this.em.createQueryBuilder(MovieExtend, 'movieExtend')
        .delete()
        .from(MovieExtend)
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
        let deletedMovie = await this.em.createQueryBuilder(MovieExtend, 'movieExtend')
        .delete()
        .from(MovieExtend)
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
        let deletedMovie = await this.em.createQueryBuilder(MovieExtend, 'movieExtend')
        .delete()
        .from(MovieExtend)
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