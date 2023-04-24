import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        if(status === HttpStatus.INTERNAL_SERVER_ERROR)
         console.error(exception.message);

        const errorReposonse = {
            statusCode: status,
            message: 
                status !== HttpStatus.INTERNAL_SERVER_ERROR
                ? exception.message
                : "Internal server error",
            timestamp: new Date().toISOString(),
        };

        // console.error(
        //     `${request.method}\n ${request.url}`,
        //     JSON.stringify(errorReposonse),
        //     "ExceptionFilter"
        // );

        response.status(status).json(errorReposonse);
    }
}