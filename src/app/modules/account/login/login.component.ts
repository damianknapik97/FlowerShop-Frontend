import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from 'src/app/core/viewmodels/account';
import { AccountService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  private model: LoginViewModel = {
    username: '',
    password: ''
  };


  constructor(private accService: AccountService) {}

  ngOnInit() {}

  private validateUser(): void {
    this.accService.login(this.model);
  }

}
