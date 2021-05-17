import { Response, Controller, Post, HttpStatus, Body, UseGuards } from '@nestjs/common';
import { AuthService } from 'modules/auth/auth.service';

@Controller()
export class LoginController {
    constructor(private authService: AuthService) {}
    
    @Post('token')
    async login(@Body() body: any, @Response() res: any) {
        try {
            if (!body.userNickName || !body.userPassword) {
              return res.status(HttpStatus.BAD_REQUEST).json({ message: "One of data is missing" });
            }
            let user =  await this.authService.login(body);
            return res.status(HttpStatus.OK).json(user);
          } catch (error) {
            console.error(error.message);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
          }
    }
}
