import { MovieDto } from "./MovieDto";

export class MovieExtendDto extends MovieDto {
    
    // @IsNotEmpty()
    // imdbID: string;

    // @IsNotEmpty()
    // title: string;
    
    // poster: string;
    
    // userID: string;
    
    // year: number;
    
    plot: string;
    
    website: string;
    
    rated: string;
    
    imdbRating: number;
    
    seen: boolean;
    
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