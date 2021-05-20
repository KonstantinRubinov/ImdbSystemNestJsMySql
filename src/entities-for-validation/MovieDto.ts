import { IsNotEmpty } from "class-validator";

export class MovieDto {
  @IsNotEmpty()
  imdbID: string;
  
  @IsNotEmpty()
  userID: string;
  
  title: string;
  
  poster: string;
  
  year: number;
  
  public toString(): string {
    return 'imdbID:' + this.imdbID +
           ' userID:' + this.userID +
           ' title:' + this.title +
           ' poster:' + this.poster +
           ' year:' + this.year;
  }
    
  constructor(tmpImdbID: string, tmpTitle: string, tmpPoster: string, tmpUserID: string, tmpYear: number) {
    this.imdbID = tmpImdbID;
    this.title = tmpTitle;
    this.poster = tmpPoster;
    this.userID = tmpUserID;
    this.year = tmpYear;
  }
}