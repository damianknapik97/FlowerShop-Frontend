import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../security';
import { environment } from 'src/environments/environment';

import { LoginDto, AccountDto, AccountDetailsDto, PasswordChangeDto } from '../dto/account';
import { MessageResponseDto } from '../dto';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(
        private http: HttpClient,
        private authService: AuthenticationService
    ) {}

    public login(loginModel: LoginDto): void {
        this.authService.login(loginModel);
    }

    public register(model: AccountDto): Observable<MessageResponseDto> {

        return this.http.post<MessageResponseDto>(environment.apiUrl + '/account', model);
    }

    public delete(password: string): Observable<string> {
        const params = new HttpParams().set('password', password);

        /*
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
        */

        return this.http.delete<string>(environment.apiUrl + '/account', {params});
    }

    public updateDetails(model: AccountDetailsDto): Observable<any> {
        return this.http.put(environment.apiUrl + '/account', model);
    }

    public updatePassword(model: PasswordChangeDto): Observable<string> {
        return this.http.put<string>(environment.apiUrl + '/account/password', model)
    }

    public getDetails(): Observable<AccountDetailsDto> {
        return this.http.get<AccountDetailsDto>(environment.apiUrl + '/account');
    }



}
