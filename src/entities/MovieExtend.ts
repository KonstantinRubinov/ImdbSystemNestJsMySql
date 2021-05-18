import { Entity, Column, PrimaryColumn, OneToOne, ManyToOne } from 'typeorm';
import { Movie } from './Movie';
import { User } from './User';

@Entity()
export class MovieExtend extends Movie {
    
    // @PrimaryColumn()
    // imdbID: string;

    // @Column()
    // title: string;

    // @Column()
    // poster: string;

    // @Column()
    // userID: string;

    // @Column()
    // year: number;

    @Column()
    plot: string;

    @Column()
    website: string;
    
    @Column()
    rated: string;

    @Column()
    imdbRating: number;

    @Column()
    seen: boolean;

    // @OneToOne(() => Movie)
    // movie?: Movie;
    
    @ManyToOne(() => User)
    user?: User;

    public toString(): string {
        return 'imdbID:' + this.imdbID +
               ' userID:' + this.userID +
               ' title:' + this.title +
               ' poster:' + this.poster +
               ' year:' + this.year +
               ' plot:' + this.plot +
               ' website:' + this.website +
               ' rated:' + this.rated +
               ' imdbRating:' + this.imdbRating +
               ' seen:' + this.seen;
    }


    constructor(
        public tmpImdbID: string,
        public tmpTitle: string,
        public tmpPlot: string,
        public tmpWebsite: string,
        public tmpRated: string,
        public tmpImdbRating: number,
        public tmpSeen: boolean,
        public tmpPoster: string,
        public tmpUserID: string,
        public tmpYear:number
    ) { 
        super(tmpImdbID, tmpTitle, tmpPoster, tmpUserID, tmpYear);
        this.plot = tmpPlot;
        this.website = tmpWebsite;
        this.rated = tmpRated;
        this.imdbRating = tmpImdbRating;
        this.seen = tmpSeen;
    }
}