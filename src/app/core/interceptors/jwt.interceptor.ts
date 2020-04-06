import { Injectable } from '@angular/core';
import { AuthenticationService } from 'src/app/core/security';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authenticationService.currentUserValue;
        const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (currentUser != null && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: currentUser.token,
                    Role: currentUser.role
                }
            });
        }

        return next.handle(request);
    }
}
