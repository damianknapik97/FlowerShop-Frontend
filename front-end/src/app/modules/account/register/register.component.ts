import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Account } from '../model/account';
import { environment } from 'src/environments/environment.prod';



@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.sass']
})

export class RegisterComponent implements OnInit {


  public checkBoxValue: boolean
  private model: Account = {
    name: '',
    email: '',
    password: '',
    role: 'user',
  };

  constructor(private http: HttpClient) {
    this.checkBoxValue = false;
   }
  ngOnInit() {
  }


  createAccount(): void {

    this.http.post(environment.apiUrl + '/account/register', this.model).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
}
