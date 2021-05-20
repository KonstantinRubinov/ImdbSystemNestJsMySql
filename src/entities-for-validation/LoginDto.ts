import { IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty()
  userNickName: string;

  @IsNotEmpty()
  userPassword: string;
  
  userLevel: number;
  
  userPicture: string;
  
  userImdbPass: string;
  
  constructor(tmpUserNickName: string, tmpUserPassword: string, tmpUserLevel: number, tmpUserPicture: string, tmpUserImdbPass: string) {
    this.userNickName = tmpUserNickName;
    this.userPassword = tmpUserPassword;
    this.userLevel = tmpUserLevel;
    this.userPicture = tmpUserPicture;
    this.userImdbPass = tmpUserImdbPass;
  }
}