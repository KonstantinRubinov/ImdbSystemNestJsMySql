import { Entity, Column } from 'typeorm';

@Entity()
export class Login {
  @Column()
  userNickName: string;

  @Column()
  userPassword: string;

  @Column()
  userLevel: number;

  @Column()
  userPicture: string;

  @Column()
  userImdbPass: string;
  
  constructor(tmpUserNickName: string, tmpUserPassword: string, tmpUserLevel: number, tmpUserPicture: string, tmpUserImdbPass: string) {
    this.userNickName = tmpUserNickName;
    this.userPassword = tmpUserPassword;
    this.userLevel = tmpUserLevel;
    this.userPicture = tmpUserPicture;
    this.userImdbPass = tmpUserImdbPass;
  }
}