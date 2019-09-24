import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginViewModel, Account } from '../models';
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
        return this.http.post<string>(environment.apiUrl + '/account/register', model);
    }

    public delete(password: string): Observable<any> {
        const params = new HttpParams().set('accountID', this.authService.currentUserID)
                                       .set('password', password);

        return this.http.delete<any>(environment.apiUrl + '/account', {params});
    }

    public updateDetails(model: Account): Observable<any> {
        return this.http.put<any>(environment.apiUrl + '/account', model);
    }

    public getDetails(): Observable<Account> {
        return this.http.get<Account>(environment.apiUrl + '/account');
    }



}
