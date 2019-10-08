import { Component, OnInit } from '@angular/core';
import { LoginDto } from 'src/app/core/dto/account';
import { AccountService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public model: LoginDto = {
    username: '',
    password: ''
  };


  constructor(private accService: AccountService) {}

  ngOnInit() {}

  public validateUser(): void {
    this.accService.login(this.model);
  }

}
