import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountRole } from '../constants/account-role.enum';
import { AuthenticationService } from '../services/authentication.service';

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
                    Role: AccountRole[currentUser.role]
                }
            });
        }

        return next.handle(request);
    }
}
