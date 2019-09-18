import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../../core/model/account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  account: Account;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllAccountData();
  }

  public getAllAccountData(){
    const url = environment.apiUrl + '/account/root';
    this.http.get<Account>(url).subscribe(
      res => {
        this.account = res;
      },
      err => {

      }
    );

  }

}
