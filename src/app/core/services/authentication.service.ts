import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginDTO, UserDTO } from '../dto/account';

import { AccountRole } from '../constants/account-role.enum';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserDTO>;
  public currentUser: Observable<UserDTO>;
  private storageItemName = 'User';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<UserDTO>(
      JSON.parse(localStorage.getItem(this.storageItemName))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserDTO {
    return this.currentUserSubject.value;
  }

  public get currentUserID(): string {
    if (this.currentUserValue != null) {
      const toReturn: string = this.currentUserValue.accId;
      if (toReturn != null) {
        return toReturn;
      }
    }
    return '';
  }

  /**
   * Sends request to backend in order ro recive JWT Token and account role, and saves it to local storage.
   *
   * @param loginViewModel - Login credentials
   */
  public login(loginViewModel: LoginDTO): void {
    this.http
      .post<void>(environment.apiUrl + '/login', loginViewModel, {
        observe: 'response',
      })
      .subscribe(
        (response: HttpResponse<void>) => {
          localStorage.removeItem(this.storageItemName);
          if (response.status === 200) {
            const newUser: UserDTO = {
              accId: response.headers.get('ID'),
              role: AccountRole[response.headers.get('Role')],
              token: response.headers.get('Authorization'),
            };
            localStorage.setItem(this.storageItemName, JSON.stringify(newUser));
            this.currentUserSubject.next(
              JSON.parse(localStorage.getItem(this.storageItemName))
            );
            this.redirectToMainPage();
          } else {
            this.snackBar.open(
              'Login failed, please check your credentials',
              'Warning',
              { duration: 3000 }
            );
          }
        },
        (error) => {
          this.snackBar.open(
            'Login failed, please check your credentials',
            'Warning',
            { duration: 3000 }
          );
        }
      );
  }

  /**
   * Sends request to backend in order to remove JWT Token, and cleans local storage together with all currently used variables.
   */
  public logout(message?: string): void {
    this.http
      .post(environment.apiUrl + '/logout', null)
      .subscribe()
      .add(() => {
        localStorage.removeItem(this.storageItemName);
        this.currentUserSubject.next(null);
        if (message != null) {
          this.redirectToMainPage(message);
        } else {
          this.redirectToMainPage('Logged out !');
        }
      });
  }

  /**
   * Utilizes router to navigate to the maing page.
   *
   * @param snackBarMessage - Adding this paramter displays Snack Bar after redirection, contianing provided information
   * @param snackBarTitle - Adding this paramter allows to change snack bar title from 'Information' to provided one
   */
  public redirectToMainPage(
    snackBarMessage?: string,
    snackBarTitle?: string
  ): void {
    this.router.navigate(['/']).then(() => {
      if (snackBarMessage != null) {
        if (snackBarTitle != null) {
          this.snackBar.open(snackBarMessage, snackBarTitle, {
            duration: 3000,
          });
        } else {
          this.snackBar.open(snackBarMessage, 'Information', {
            duration: 3000,
          });
        }
      }
    });
  }
}
