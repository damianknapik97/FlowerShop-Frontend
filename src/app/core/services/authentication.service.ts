import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginDTO, UserDTO } from '../dto/account';

import { MatSnackBar } from '@angular/material';
import { AccountRole } from '../constants/account-role.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserDTO>;
  public currentUser: Observable<UserDTO>;
  private storageItemName = 'User';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
      this.currentUserSubject = new BehaviorSubject<UserDTO>( JSON.parse(localStorage.getItem(this.storageItemName)));
      this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): UserDTO {
      return this.currentUserSubject.value;
   }

   public get currentUserID(): string {
     if(this.currentUserValue != null){
      const toReturn: string = this.currentUserValue.accId;
      if (toReturn != null) {
        return toReturn;
      }
    }
     return '';
   }

   public login(loginViewModel: LoginDTO): void {
      this.http.post<void>(environment.apiUrl + '/login', loginViewModel, {observe: 'response'}).subscribe(
        (response: HttpResponse<void>) => {
          localStorage.removeItem(this.storageItemName);
          if (response.status === 200) {
            const newUser: UserDTO = {
              accId : response.headers.get('ID'),
              role : AccountRole[response.headers.get('Role')],
              token : response.headers.get('Authorization')
            };
            localStorage.setItem(this.storageItemName, JSON.stringify(newUser));
            this.currentUserSubject.next(JSON.parse(localStorage.getItem(this.storageItemName)));
            this.redirectToMainPage();
          } else {
           this.snackBar.open('Login failed, please check your credentials', 'Warning', {duration: 3000});
          }
        },
        error => {
          this.snackBar.open('Login failed, please check your credentials', 'Warning', {duration: 3000});
        }

      );
   }

   public logout(): void {
    this.http.post(environment.apiUrl + '/logout', null).subscribe().add(
      () => {
        localStorage.removeItem(this.storageItemName);
        this.currentUserSubject.next(null);
        this.redirectToMainPage('Logged out !');
      }
    );
   }

   private redirectToMainPage(snackBarMessage?: string): void {
    this.router.navigate(['/']).then(
      () => {
        if (snackBarMessage != null) {
          this.snackBar.open(snackBarMessage, 'Information', {duration: 3000});
        }
    });
   }
}
