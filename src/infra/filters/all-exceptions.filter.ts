import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionData =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const message =
      typeof exceptionData === 'object'
        ? (exceptionData as any).message
        : exceptionData;

    const error =
      typeof exceptionData === 'object'
        ? (exceptionData as any).error
        : 'Unknown Error';

    response.status(status).json({
      success: false,
      message,
      error,
      timestamp: new Date().toISOString(),
    });
  }
}
