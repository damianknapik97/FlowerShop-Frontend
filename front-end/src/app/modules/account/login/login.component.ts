import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from 'src/app/core/models';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from 'src/app/core/services';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  private strMessage = new BehaviorSubject<string>('');
  private model: LoginViewModel = {
    username: '',
    password: ''
  };


  constructor(private accService: AccountService) {}

  ngOnInit() {}

  private validateUser(): void {
    this.strMessage.next(this.accService.login(this.model));
  }

}
