import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Movie } from './Movie';

@Entity()
export class User {
    @PrimaryColumn()
    userID: string;

    @Column()
    userFirstName: string;

    @Column()
    userLastName: string;

    @Column()
    userNickName: string;

    @Column()
    userPassword: string;

    @Column()
    userEmail: string;

    @Column()
    userGender: string;

    @Column()
    userBirthDate: Date;

    @Column()
    userPicture: string;

    @Column()
    userLevel?: number;

    @Column()
    userImage?: string;

    @Column()
    userImdbPass: string;

    @OneToMany(type => Movie, movie => movie.user)
    movies?: Movie[];

    constructor(
      userID: string,
      userFirstName: string,
      userLastName: string,
      userNickName: string,
      userPassword: string,
      userEmail: string,
      userGender: string,
      userBirthDate: Date,
      userPicture: string,
      userImdbPass: string
  ){ 
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;
    this.userID = userID;
    this.userNickName = userNickName;
    this.userBirthDate = userBirthDate;
    this.userGender = userGender;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
    this.userPicture = userPicture;
    this.userImdbPass = userImdbPass;
  }

}
