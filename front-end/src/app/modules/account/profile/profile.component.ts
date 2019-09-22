import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Account } from '../../../core/model/account.viewmodel';
import { User } from 'src/app/core/model/user.viewmodel';
import { AuthenticationService } from 'src/app/core/security';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  private model: Account = {
    name: '',
    email: '',
    password: '',
    role: ''
  };
  private passwordConfirmation = '';
  private message = '';

  private isPasswordEmpty(): boolean {
    if (this.model.password !== '') {
      return false;
    }
    return true;
  }


  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.retrieveAccountDetails();
  }

  private retrieveAccountDetails(): void {

    const user: User = JSON.parse(localStorage.getItem('User'));
    const params = new HttpParams().set('accountID', user.id);

    this.http.get<Account>(environment.apiUrl + '/account', {params}).subscribe(
      res => {
        this.model = res;
      },
      err => { }
    );
  }

  private updateAccountDetails(): void {
    this.http.put<string>(environment.apiUrl + '/account', this.model).subscribe(
      res => {
        this.message = res;
      },
      err => { }
    );
  }

  private removeAccount(): void {

    const user: User = JSON.parse(localStorage.getItem('User'));
    const params = new HttpParams().set('accountID', user.id);

    this.http.delete(environment.apiUrl + '/account', {params}).subscribe();

    this.authenticationService.logout();
  }
}
