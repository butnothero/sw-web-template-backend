interface HttpStatus {
  httpStatus?: number;
}

interface AuthLoginResponseError extends HttpStatus {
  success: boolean;
  message: string;
}

interface AuthLoginResponseSuccess extends HttpStatus {
  access_token: string;
}

export type AuthLoginResponse = AuthLoginResponseError | AuthLoginResponseSuccess;

export interface SuccessResponse {
  success: true;
}
