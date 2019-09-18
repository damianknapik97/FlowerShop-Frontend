import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginViewModel } from '../model/login.viewmodel';
import { Router } from '@angular/router';

/*tslint:disable */
@Injectable()
export class AuthenticationService {

  private currentTokenSubject: BehaviorSubject<String>;
  public currentToken: Observable<String>;
  private storageItemName: string = 'jwtToken';

	constructor( private http: HttpClient, private router: Router ) {
      this.currentTokenSubject = new BehaviorSubject<String>( JSON.parse(localStorage.getItem(this.storageItemName)));
      this.currentToken = this.currentTokenSubject.asObservable();
   }

   public get currentTokenValue(): String {
      return this.currentTokenSubject.value;
   }

   login(loginViewModel: LoginViewModel){


    this.http.post(environment.apiUrl+'/login', loginViewModel, {observe :'response'}).subscribe(
      response => {
        const jwtToken = response.headers.get('Authorization');
        console.log(response.headers.get('Expires'));
        localStorage.setItem(this.storageItemName, JSON.stringify(jwtToken));
        this.currentTokenSubject.next(JSON.parse(localStorage.getItem(this.storageItemName)));
        this.router.navigate(['/']);
      }
        
    );
    /*
     return this.http.post<any>(environment.apiUrl+'/login', loginViewModel).pipe(map(user => {
      user.token
      console.log(user.token);
       if (user && user.token){
         // Store token in local storage
         localStorage.setItem('currentUser', JSON.stringify(user));
         this.currentUserSubject.next(user);
       }

       return user
     })).subscribe();
    

         */
   }
   
   logout() {
     
    localStorage.removeItem(this.storageItemName);
    this.currentTokenSubject.next(null);

   }
}
