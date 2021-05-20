import { IsDate, IsEmail, IsNotEmpty } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    userID: string;

    @IsNotEmpty()
    userFirstName: string;

    @IsNotEmpty()
    userLastName: string;

    @IsNotEmpty()
    userNickName: string;

    @IsNotEmpty()
    userPassword: string;

    @IsEmail()
    userEmail: string;

    @IsNotEmpty()
    userGender: string;

    @IsDate()
    userBirthDate: Date;

    @IsNotEmpty()
    userPicture: string;
    
    userLevel?: number;
    
    userImage?: string;

    @IsNotEmpty()
    userImdbPass: string;
    
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
