import { HttpStatus, Injectable } from '@nestjs/common';
import type { Response, Request } from 'express';
import { LoginAuthDto } from './dto/login-auth.dto';
import { apiAuth } from './api';
import { AuthLoginResponse, SuccessResponse } from './interfaces';

@Injectable()
export class AuthService {
  // TODO: Лучше в UseGuards
  private readonly accessCookieName = 'accessToken';
  private readonly accessCookieMaxAge = 2592000 * 500;

  logout(response: Response) {
    response.clearCookie(this.accessCookieName);
    response.status(HttpStatus.OK).json({ success: true });
  }

  async login(updateAuthDto: LoginAuthDto, response: Response): Promise<Error | AuthLoginResponse> {
    try {
      const authLogin = await apiAuth.login(updateAuthDto);
      if ('access_token' in authLogin) {
        response.cookie(this.accessCookieName, authLogin.access_token, {
          httpOnly: true,
          maxAge: this.accessCookieMaxAge,
        });
        response.json({
          accessToken: authLogin.access_token,
        });
      } else {
        response.status(HttpStatus.OK);
        response.json(authLogin);
      }
    } catch (e) {
      console.error('[backend] login error', updateAuthDto, e);
      return e;
    }
  }

  sendAccessToken(request: Request) {
    const accessToken = request.cookies?.[this.accessCookieName];
    return {
      accessToken,
    };
  }
}
