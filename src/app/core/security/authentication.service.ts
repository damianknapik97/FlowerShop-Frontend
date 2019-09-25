import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoginViewModel } from '../models';
import { User } from '../models';

import { MatSnackBar } from '@angular/material';

/*tslint:disable */
@Injectable()
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private storageItemName: string = 'User';

	constructor( private http: HttpClient, private snackBar: MatSnackBar ) {
      this.currentUserSubject = new BehaviorSubject<User>( JSON.parse(localStorage.getItem(this.storageItemName)));
      this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
      return this.currentUserSubject.value;
   }

   public get currentUserID(): string {
     if(this.currentUserValue != null){
      let toReturn: string = this.currentUserValue.accId;
      if(toReturn != null){
        return toReturn;
      }
    }
     return "";
   }

   public login(loginViewModel: LoginViewModel): void {

      this.http.post(environment.apiUrl+'/login', loginViewModel, {observe :'response'}).subscribe(
        response => {
          localStorage.removeItem(this.storageItemName);
          if(response.status == 200) {
            let newUser: User = {
              accId : response.headers.get('ID'),
              role : response.headers.get('Role'),
              token : response.headers.get('Authorization')
            };
            localStorage.setItem(this.storageItemName, JSON.stringify(newUser));
            this.currentUserSubject.next(JSON.parse(localStorage.getItem(this.storageItemName)));  
            location.reload();
          } else {
           this.snackBar.open('Login failed, please check your credentials');
          }
          
        },
        error => {
          this.snackBar.open('Login failed, please check your credentials');
        }
          
      );
   }
   
   logout() {
     
    localStorage.removeItem(this.storageItemName);
    //this.http.get(environment.apiUrl+'/logout').subscribe()
    this.currentUserSubject.next(null);
    
    location.reload();

   }
}
