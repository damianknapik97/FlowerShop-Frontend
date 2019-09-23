import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User, Account } from 'src/app/core/models';
import { AuthenticationService } from 'src/app/core/security';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  private model: Account = {
    id: this.authService.currentUserID,
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


  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  ngOnInit() {
    this.retrieveAccountDetails();
  }

  private retrieveAccountDetails(): void {

    const params = new HttpParams().set('accountID', this.model.id);

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
    const params = new HttpParams().set('accountID', this.model.id);

    this.http.delete(environment.apiUrl + '/account', {params}).subscribe();

    this.authService.logout();
  }
}
