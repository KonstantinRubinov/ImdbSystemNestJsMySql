import { Response, Get, Controller, Post, Put, HttpStatus, Param, Body, Delete, UseGuards } from '@nestjs/common';
import { UserDto } from 'entities-for-validation/UserDto';
import { JwtAuthGuard } from 'guards/jwtAuthGuard';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Post('check')
  async ReturnUserByNamePassword(@Body() body: UserDto, @Response() res: any) {
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
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async AddUser(@Body() body: UserDto, @Response() res: any) {
    try {
      if (!body) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: "One of data is missing" });
      }
      let user =  await this.userService.AddUser(body);
      return res.status(HttpStatus.CREATED).json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userID')
  async UpdateUser(@Param('userID') userID: string, @Body() body: UserDto, @Response() res: any) {
    try {
      let user =  await this.userService.UpdateUser(body, userID);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.error(error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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