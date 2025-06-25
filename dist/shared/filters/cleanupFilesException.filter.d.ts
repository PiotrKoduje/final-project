import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class FileCleanupExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): Promise<void>;
}
