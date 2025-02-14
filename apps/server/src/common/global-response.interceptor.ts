import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const isObject = typeof response === 'object' && response !== null;
        const customMessage =
          isObject && 'message' in response
            ? (response as any).message
            : 'Success';

        return {
          message: customMessage,
          data:
            isObject && 'data' in response ? (response as any).data : response,
          statusCode: context.switchToHttp().getResponse().statusCode,
        };
      }),
    );
  }
}
