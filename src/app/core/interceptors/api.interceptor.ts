import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Optionally modify request here (e.g., add headers)
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          // Ensure all responses are wrapped in { message, data }
          return event.clone({
            body: {
              message: event.body?.message || '',
              data: event.body?.data ?? event.body ?? []
            }
          });
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // Wrap error in { message, data: [] }
        return throwError(() => ({
          message: error.message || 'Unknown error',
          data: []
        }));
      })
    );
  }
}
