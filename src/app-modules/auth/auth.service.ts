import { HttpStatus, Injectable } from '@nestjs/common';
import type { Response, Request } from 'express';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  // TODO: Лучше в UseGuards
  private readonly accessCookieName = 'accessToken';
  private readonly accessCookieMaxAge = 2592000 * 500;

  logout(response: Response) {
    response.clearCookie(this.accessCookieName);
    response.status(HttpStatus.OK).json({ success: true });
  }

  login(updateAuthDto: LoginAuthDto, response: Response) {
    return 'login';
  }

  sendAccessToken(request: Request) {
    const accessToken = request.cookies?.[this.accessCookieName];
    return {
      accessToken,
    };
  }
}
