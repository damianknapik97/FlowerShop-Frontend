import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from './login.viewmodel';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  model: LoginViewModel = {
    login: '',
    password: ''
  };

  constructor() {
  }

  ngOnInit() {
  }

}
