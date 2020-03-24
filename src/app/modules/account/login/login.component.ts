import { Component, OnInit, Input } from '@angular/core';
import { LoginDTO } from 'src/app/core/dto/account';
import { AccountService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  @Input() public model: LoginDTO = {
    username: '',
    password: ''
  };


  constructor(private accService: AccountService) {}

  ngOnInit() {}

  public validateUser(): void {
    this.accService.login(this.model);
  }

}
