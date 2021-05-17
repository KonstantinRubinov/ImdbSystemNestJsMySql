import { Response, Get, Controller, Post, Put, HttpStatus, Param, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  async GetAllUsers(@Response() res: any) {
    try {
      let users =  await this.userService.GetAllUsers();
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get(':userID')
  async GetOneUser(@Param('userID') userID: string, @Response() res: any) {
    try {
      let user =  await this.userService.GetOneUser(userID);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Post('check')
  async ReturnUserByNamePassword(@Body() body: any, @Response() res: any) {
    try {
      if (!body.userNickName || !body.userPassword) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: "One of data is missing" });
      }
      let user =  await this.userService.ReturnUserByNamePassword(body.userNickName, body.userPassword);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  
  @Post()
  async AddUser(@Body() body: any, @Response() res: any) {
    try {
      if (!body.kidId || !body.kidName || !body.kidBirthdate) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: "One of data is missing" });
      }
      let user =  await this.userService.AddUser(body);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Put(':userID')
  async UpdateUser(@Param('userID') userID: string, @Body() body: any, @Response() res: any) {
    try {
      let user =  await this.userService.UpdateUser(body, userID);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Delete(':userID')
  async DeleteUser(@Param('userID') userID: string, @Response() res: any) {
    try {
      let user =  await this.userService.DeleteUser(userID);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Delete()
  async DeleteUsers(@Response() res: any) {
    try {
      let user =  await this.userService.DeleteUsers();
      return res.status(HttpStatus.NO_CONTENT).json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}