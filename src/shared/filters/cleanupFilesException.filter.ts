import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs/promises';
import * as path from 'path';

@Catch()
export class FileCleanupExceptionFilter implements ExceptionFilter {
  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const files = request.files as Express.Multer.File[];

    if (files && Array.isArray(files)) {
      for (const file of files) {
        const filePath = path.join(
          process.cwd(),
          'public',
          'uploads',
          'photos',
          file.filename,
        );
        try {
          await fs.unlink(filePath);
        } catch (err) {
          console.error(`Error deleting file ${filePath}:`, err.message);
        }
      }
    }

    // for HttpExceptions
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const responseBody = exception.getResponse();
      response.status(status).json(responseBody);
    } else {
      // for ServerExceptions
      response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
}
