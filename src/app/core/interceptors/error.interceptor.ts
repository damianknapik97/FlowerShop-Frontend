import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            let errorMsg = '';

            if (err.status === 401) {
               errorMsg = 'Insufficient privileges';
            } else if ( err.status === 404 || err.status === 101) {
                errorMsg = 'Service not found!';
            } else {
                errorMsg = err.message;
            }

            if (!errorMsg) {
                errorMsg = 'Error! Service currenty unavaible, please try again later';
                return throwError(errorMsg);
            }

            const error = err.statusText || errorMsg;
            return throwError(error);
        }));
    }
}
