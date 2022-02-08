import { AuthService } from './auth.service';
import { BadRequestException, Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { User } from '@suiteportal/api-interfaces';


@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('/login')
  async login(@Body() body: User) {
    if (!body){
      throw new BadRequestException();
    }
    var user = await this.authService.getAdminUsers(body);
    if (!user) {
      throw new HttpException(
        `Invalid username or password please try again.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}