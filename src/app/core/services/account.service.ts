import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginViewModel, Account, AccountDetailsViewModel, PasswordChangeViewModel } from '../viewmodels/account';
import { AuthenticationService } from '../security';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(
        private http: HttpClient,
        private authService: AuthenticationService
    ) {}

    public login(loginModel: LoginViewModel): void {
        this.authService.login(loginModel);
    }

    public register(model: Account): Observable<string> {
        return this.http.post<string>(environment.apiUrl + '/account', model);
    }

    public delete(password: string): Observable<string> {
        const params = new HttpParams().set('password', password);

        return this.http.delete<string>(environment.apiUrl + '/account', {params});
    }

    public updateDetails(model: AccountDetailsViewModel): Observable<string> {
        return this.http.put<string>(environment.apiUrl + '/account', model);
    }

    public updatePassword(model: PasswordChangeViewModel): Observable<string> {
        return this.http.put<string>(environment.apiUrl + '/password', model)
    }

    public getDetails(): Observable<Account> {
        return this.http.get<Account>(environment.apiUrl + '/account');
    }



}
