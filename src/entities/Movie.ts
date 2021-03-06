import { Entity, Column, PrimaryColumn, OneToOne, ManyToOne } from 'typeorm';
import { MovieExtend } from './MovieExtend';
import { User } from './User';

@Entity()
export class Movie {
  @PrimaryColumn()
  imdbID: string;
  
  @PrimaryColumn()
  userID: string;

  @Column()
  title: string;

  @Column()
  poster: string;
    
  @Column()
  year: number;

  // @OneToOne(() => MovieExtend)
  // movieExtend?: MovieExtend;

  @ManyToOne(() => User)
  user?: User;

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