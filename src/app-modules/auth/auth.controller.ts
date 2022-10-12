import { Controller, Get, Post, Body, UsePipes, Res, Req, ValidationPipe } from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('logout')
  logout(@Res() response: Response) {
    return this.authService.logout(response);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Res() response: Response, @Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto, response);
  }

  @Get('access-token')
  sendAccessToken(@Req() request: Request) {
    return this.authService.sendAccessToken(request);
  }
}
