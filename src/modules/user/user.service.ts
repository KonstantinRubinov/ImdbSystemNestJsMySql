import { Injectable } from '@nestjs/common';
import { User } from 'entities/User';
import { EntityManager } from 'typeorm';
const movieService = require("../movie/movie.service");
const movieextendService = require("../movieextend/movie-extend.service");
const bcrypt = require("bcrypt");
var fs = require('fs');

@Injectable()
export class UserService {
    constructor(private readonly em: EntityManager) { }

    private isValidIsraeliID(id) {
      id = String(id).trim();
      if (id.length > 9 || id.length < 5 || isNaN(id)){
          return false;
      }
      
      // Pad string with zeros up to 9 digits
      id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
  
      let res= Array
          .from(id, Number)
          .reduce((counter, digit, i) => {
              const step = digit * ((i % 2) + 1);
              return counter + (step > 9 ? step - 9 : step);
          }) % 10 === 0;
  
      return res;
  }
  
  private createGuid(){  
      function S4() {  
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);  
      }  
      return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();  
  }

  async GetAllUsers(){
    try {
      const users = await this.em.createQueryBuilder(User, 'user')
      .getMany();
      return users;
    } catch (error) {
      throw Error(error);
    }
  }

  async GetOneUser(userID){
    try {
      const user = await this.em.createQueryBuilder(User, 'user')
      .where("user.userID = :userID", { userID: userID })
      .getOne();
      return user;
    } catch (error) {
      throw Error(error);
    }
  }

  async ReturnUserByNamePassword(userNickName, userPassword){
    try {
      const users = await this.em.createQueryBuilder(User, 'user')
      .where("movie.userNickName = :userNickName", { userNickName: userNickName })
      .andWhere("movie.userPassword = :userPassword", { userPassword: userPassword })
      .getOne();
      return users;
    } catch (error) {
      throw Error(error);
    }
  }

  async AddUser(body:User){
    return bcrypt.hash(body.userPassword, 10).then((hash) => {
      let extension:any;
      let pictureName = "";
      let filePath="";
      let buff:any;
      let fd="";

      if(!this.isValidIsraeliID(body.userID)){
          throw Error("Not Israel Id");
      }

      if(body.userPicture!==undefined && body.userPicture!==null && body.userPicture!==""){
          extension = body.userPicture.split(".");
          extension = extension[extension.length-1];
          pictureName = this.createGuid()+"."+extension;
          filePath = "./src/assets/images/users/"+pictureName;

          if(body.userImage!==undefined && body.userImage!==null && body.userImage!==""){
            body.userImage = body.userImage.replace(/^data:image\/\w+;base64,/, "");
            body.userImage = body.userImage.replace(/ /g, '+');
            buff = Buffer.from(body.userImage, 'base64');
          }
          fd =  fs.openSync(filePath, 'w');
          fs.write(fd, buff, 0, buff.length, 0, function(error,written){
              if (error!=null){
                  fs.closeSync( fd );
                  throw Error(error);
              }
              fs.closeSync( fd );
          });
          body.userImage = "";
      }
      
      const user = new User(
        body.userID,
        body.userFirstName,
        body.userLastName,
        body.userNickName,
        hash,
        body.userEmail,
        body.userGender,
        body.userBirthDate,
        pictureName,
        body.userImdbPass
      );
      
      let addedUser = this.em.createQueryBuilder(User, 'user')
      .insert()
      .into(User)
      .values(user)
      .execute();
      return addedUser;
    });
  };


  async UpdateUser(user:User, userID:string){
    try {
      let updatedUser = await this.em.createQueryBuilder(User, 'user')
      .update(User)
      .set(user)
      .where("userID = :userID", { userID: userID })
      .execute();
      return updatedUser;
    } catch (error) {
        throw Error(error);
    }
  }

  async DeleteUser(userID){
    try {
      let deletedUser = await this.em.createQueryBuilder(User, 'user')
      .delete()
      .from(User)
      .where("userID = :userID", { userID: userID })
      .execute();
      deletedUser.affected = deletedUser.affected + movieService.DeleteMoviesByUser(userID);
      deletedUser.affected = deletedUser.affected + movieextendService.DeleteMoviesByUser(userID);
      return deletedUser.affected;
    } catch (error) {
        throw Error(error);
    }
  }
  
  async DeleteUsers(){
    try {
      let deletedUser = await this.em.createQueryBuilder(User, 'user')
      .delete()
      .from(User)
      .execute();
      deletedUser.affected = deletedUser.affected + movieService.DeleteMovies();
      deletedUser.affected = deletedUser.affected + movieextendService.DeleteMovies();
      return deletedUser.affected;
    } catch (error) {
        throw Error(error);
    }
  }
}