import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { Observable } from 'rxjs'

export class RequestIdIterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const requestId = randomUUID();

    const request = context.switchToHttp().getRequest<Request>();
    request.headers['X-Request-Id'] = requestId;

    Logger.log(`[${request.method}: ${request.url}]: RequestId is ${requestId}`);
    return next.handle();
  }
}
