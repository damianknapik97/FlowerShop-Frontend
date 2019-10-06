import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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

        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'DELETE',
                'Access-Control-Allow-Origin': '*'
            }),
            body: {
                password
            }
        }

        return this.http.delete<string>(environment.apiUrl + '/account', options);
    }

    public updateDetails(model: AccountDetailsViewModel): Observable<any> {
        return this.http.put(environment.apiUrl + '/account', model);
    }

    public updatePassword(model: PasswordChangeViewModel): Observable<string> {
        return this.http.put<string>(environment.apiUrl + '/account/password', model)
    }

    public getDetails(): Observable<AccountDetailsViewModel> {
        return this.http.get<AccountDetailsViewModel>(environment.apiUrl + '/account');
    }



}
