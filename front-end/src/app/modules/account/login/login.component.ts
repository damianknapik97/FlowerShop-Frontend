import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from '../../../core/model/login.viewmodel';
import { AuthenticationService } from 'src/app/core/security';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public strMessage: string;

  private strMessage2 = new BehaviorSubject<string>('');

  isMessageEmpty() {
    if (this.strMessage2.value === '' || this.strMessage2.value === null) {
      return true;
    } else {
      return false;
    }
  }

  model: LoginViewModel = {
    username: '',
    password: ''
  };

  constructor(private authenticationService: AuthenticationService) {
    this.strMessage = '';
   }

  ngOnInit() {}

  validateUser(): void {
    let loginResult: boolean = this.authenticationService.login(this.model);

    if(loginResult) {
      this.strMessage2.next('Login Succesful !')
    } else {
      this.strMessage2.next('Login Failed ! ')
    }

  }

}
