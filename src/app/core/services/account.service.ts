import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../security';
import { environment } from 'src/environments/environment';

import { LoginDTO, AccountDTO, AccountDetailsDTO, PasswordChangeDTO } from '../dto/account';
import { MessageResponseDTO } from '../dto';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    constructor(
        private http: HttpClient,
        private authService: AuthenticationService
    ) {}

    public login(loginModel: LoginDTO): void {
        this.authService.login(loginModel);
    }

    public register(model: AccountDTO): Observable<MessageResponseDTO> {

        return this.http.post<MessageResponseDTO>(environment.apiUrl + '/account', model);
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

    public updateDetails(model: AccountDetailsDTO): Observable<any> {
        return this.http.put(environment.apiUrl + '/account', model);
    }

    public updatePassword(model: PasswordChangeDTO): Observable<string> {
        return this.http.put<string>(environment.apiUrl + '/account/password', model)
    }

    public getDetails(): Observable<AccountDetailsDTO> {
        return this.http.get<AccountDetailsDTO>(environment.apiUrl + '/account');
    }



}
