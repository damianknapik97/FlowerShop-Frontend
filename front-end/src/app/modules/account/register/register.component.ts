import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RegisterViewModel } from './register.viewmodel';



@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.sass']
})

export class RegisterComponent implements OnInit {


  public checkBoxValue: boolean
  private model: RegisterViewModel = {
    name: '',
    password: '',
    email: '',
    role: 'user',
  };

  constructor(private http: HttpClient) {
    this.checkBoxValue = false;
   }




  ngOnInit() {
  }


  createAccount(): void {
    const url = 'http://localhost:8080/account/register';

    this.http.post(url, this.model).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
  }
}
