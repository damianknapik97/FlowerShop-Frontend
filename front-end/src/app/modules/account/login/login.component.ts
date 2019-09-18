import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from '../../../core/model/login.viewmodel';
import { AuthenticationService } from 'src/app/core/security';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  model: LoginViewModel = {
    username: '',
    password: ''
  };

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  validateUser(): void {
    this.authenticationService.login(this.model);
  }

}
