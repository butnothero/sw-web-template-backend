import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Response } from 'express';
import { isErrorHttp } from '@butnothero/tools';
import { HttpException } from '@nestjs/common';

export class ResponseMessage {
  @IsString()
  message: string;

  @IsNumber()
  httpStatus: number;

  public static send(_message: string, _httpStatus = 200) {
    const responseMessage = new ResponseMessage();
    responseMessage.message = _message;
    responseMessage.httpStatus = _httpStatus;

    if (isErrorHttp(_httpStatus)) {
      throw new HttpException(responseMessage, _httpStatus);
    }

    return responseMessage;
  }
}
