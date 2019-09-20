import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginViewModel } from '../model/login.viewmodel';
import { Router } from '@angular/router';
import { User } from '../model/user.viewmodel';

/*tslint:disable */
@Injectable()
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private storageItemName: string = 'User';
  private lastLoginResult: boolean;

	constructor( private http: HttpClient, private router: Router ) {
      this.currentUserSubject = new BehaviorSubject<User>( JSON.parse(localStorage.getItem(this.storageItemName)));
      this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
      return this.currentUserSubject.value;
   }

   login(loginViewModel: LoginViewModel): boolean{
    this.lastLoginResult = false;

    this.http.post(environment.apiUrl+'/login', loginViewModel, {observe :'response'}).subscribe(
      response => {
        localStorage.removeItem(this.storageItemName);
        if(response.status == 200) {
          let newUser: User = {
            role : response.headers.get('Role'),
            token : response.headers.get('Authorization')
          };
          localStorage.setItem(this.storageItemName, JSON.stringify(newUser));
          this.currentUserSubject.next(JSON.parse(localStorage.getItem(this.storageItemName)));  
          location.reload();
          this.lastLoginResult = true;
        }
        
      }
        
    );
    return this.lastLoginResult;
   }
   
   logout() {
     
    localStorage.removeItem(this.storageItemName);
    this.currentUserSubject.next(null);
    location.reload();

   }
}
