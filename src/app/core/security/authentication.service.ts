import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginDTO, UserDTO } from '../dto/account';

import { MatSnackBar } from '@angular/material';

/*tslint:disable */
@Injectable()
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<UserDTO>;
  public currentUser: Observable<UserDTO>;
  private storageItemName: string = 'User';

	constructor( private http: HttpClient, private snackBar: MatSnackBar ) {
      this.currentUserSubject = new BehaviorSubject<UserDTO>( JSON.parse(localStorage.getItem(this.storageItemName)));
      this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): UserDTO {
      return this.currentUserSubject.value;
   }

   public get currentUserID(): string {
     if(this.currentUserValue != null){
      let toReturn: string = this.currentUserValue.accId;
      if(toReturn != null) {
        return toReturn;
      }
    }
     return "";
   }

   public login(loginViewModel: LoginDTO): void {

      this.http.post(environment.apiUrl+'/login', loginViewModel, {observe :'response'}).subscribe(
        response => {
          localStorage.removeItem(this.storageItemName);
          if(response.status == 200) {
            let newUser: UserDTO = {
              accId : response.headers.get('ID'),
              role : response.headers.get('Role'),
              token : response.headers.get('Authorization')
            };
            localStorage.setItem(this.storageItemName, JSON.stringify(newUser));
            this.currentUserSubject.next(JSON.parse(localStorage.getItem(this.storageItemName)));
            location.reload();
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

    this.http.post(environment.apiUrl+'/logout', null).subscribe(
      res => {},
      err => {},
    ).add(
      () => {
        localStorage.removeItem(this.storageItemName);
        this.currentUserSubject.next(null);
        location.reload();
        this.snackBar.open("Logged out !", 'Information', {duration: 3000});
      }
    );
   }
}
