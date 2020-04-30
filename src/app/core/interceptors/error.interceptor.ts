import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        let errorMsg = '';

        if (err.status === 403) {
          this.authenticationService.logout(
            'Forbidden request, please try logging again later.'
          );
        } else {
          errorMsg = err.message;
        }

        if (!errorMsg) {
          errorMsg =
            'Error! Service currenty unavailable, please try again later';
          return throwError(errorMsg);
        }

        const error = err.statusText || errorMsg;
        return throwError(error);
      })
    );
  }
}
