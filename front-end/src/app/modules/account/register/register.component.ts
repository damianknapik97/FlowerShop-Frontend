import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../../core/models';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/core/security';



@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.sass']
})

export class RegisterComponent implements OnInit {


  public checkBoxValue: boolean;
  private model: Account = {
    id: this.authService.currentUserID,
    name: '',
    email: '',
    password: '',
    role: 'user',
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthenticationService) {
    this.checkBoxValue = false;
   }

  ngOnInit() {}

  createAccount(): void {

    this.http.post(environment.apiUrl + '/account/register', this.model).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    );
    this.router.navigate(['/account/login']);

  }

}
