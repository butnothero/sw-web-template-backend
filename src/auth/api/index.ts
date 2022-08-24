import AxiosWrapper from '../../plugins/axios/wrapper';
import { API_BASE_URL } from '../../env';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { AuthLoginResponse } from '../interfaces';

class ApiAuth extends AxiosWrapper {
  constructor() {
    super({
      config: {
        baseURL: `${API_BASE_URL}/auth`,
      },
    });
  }

  /**
   * Авторизация пользователя
   * @param data Данные для авторизации
   */
  login(data: LoginAuthDto) {
    return this.post<AuthLoginResponse>('/login', data);
  }
}

export const apiAuth = new ApiAuth();
