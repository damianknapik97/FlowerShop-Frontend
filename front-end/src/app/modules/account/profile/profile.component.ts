import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Account } from '../../../core/model/account';
import { User } from 'src/app/core/model/user.viewmodel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  account: Account;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.retrieveAccountDetails();
  }

  public retrieveAccountDetails(){

    const user: User = JSON.parse(localStorage.getItem('User'));

    const params = new HttpParams().set('accountID', user.id);

    this.http.get<Account>(environment.apiUrl + '/account/retrieve/', {params}).subscribe(
      res => {
        this.account = res;
      },
      err => {

      }
    );

  }

}
