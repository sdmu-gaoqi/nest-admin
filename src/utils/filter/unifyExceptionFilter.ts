import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { logger } from '../log4js';

@Catch()
export class UnifyExceptionFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const messagee =
      exception.message !== undefined
        ? exception.message
        : JSON.stringify(exception);

    response.status(200).json({
      ret: status,
      msg: messagee,
    });
  }
}
