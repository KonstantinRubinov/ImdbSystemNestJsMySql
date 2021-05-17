import { Injectable } from '@nestjs/common';
import { Movie } from 'entities/Movie';
import { MovieExtend } from 'entities/MovieExtend';


@Injectable()
export class ImdbService {
    constructor() { }
    
    private createMovieModel(jmovie, userID)
    {
        let year= Number(jmovie.Year);
        const movieModel = new Movie(jmovie.imdbID, jmovie.Title, jmovie.Poster, userID, year);
    	return movieModel;
    }

    private createMovieExtendModel(jmovie, userID)
    {
        let seen=false;
        let year= Number(jmovie.Year);
        const movieExtendModel = new MovieExtend(jmovie.imdbID, jmovie.Title, jmovie.Plot, jmovie.Website, jmovie.Rated, jmovie.ImdbRating, seen, jmovie.Poster, userID, year );
    	return movieExtendModel;
    }


    async GetImdbByWord (userImdbPass, userID, movieWord) {
        const url = "http://www.omdbapi.com/?" + "apikey=" + userImdbPass + "&s=" + movieWord;
        return fetch(url)
        .then(response=>response.json()).then(result=>{
            let movies:Movie[]=[];
            for(var i = 0; i < result.Search.length; i++) {
                movies.push(this.createMovieModel(result.Search[i], userID));
            }
            return movies;
        }).catch((error) => {
            throw Error(error);
        });
    }
    
    async GetImdbById (userImdbPass, userID, imdbID){
        const url = "http://www.omdbapi.com/?" + "apikey=" + userImdbPass + "&i=" + imdbID + "&plot=full";
        return fetch(url)
        .then(response=>response.json()).then(result=>{ 
            result = this.createMovieExtendModel(result, userID);
            return result;
        }).catch((error) => { 
            throw Error(error);
        });
    }
    
    async GetImdbByTitle(userImdbPass, userID, movieTitle) {
        const url = "http://www.omdbapi.com/?" + "apikey=" + userImdbPass + "&t=" + movieTitle;
        return fetch(url)
        .then(response=>response.json()).then(result=>{ 
            result = this.createMovieExtendModel(result, userID);
            return result;
        }).catch((error) => {
            throw Error(error);
        });
    }
}