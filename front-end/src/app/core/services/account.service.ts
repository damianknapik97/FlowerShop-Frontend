import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginViewModel } from '../models';
import { AuthenticationService } from '../security';
import { resolve } from 'q';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(
        private http: HttpClient,
        private authService: AuthenticationService
    ) {}

    public login(loginModel: LoginViewModel): string {
        this.authService.login(loginModel)
        return null;
    }
}
