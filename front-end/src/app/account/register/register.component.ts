import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RegisterViewModel } from './registerviewmodel';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.sass']
})


export class RegisterComponent implements OnInit {

  model: RegisterViewModel = {
    name: '',
    password: '',
    email: '',
    role: 'user',
    regulationsAccepted: false
  };

  constructor(private http: HttpClient) {
   }

  ngOnInit() {
  }

  digitFormControl = new FormControl('',Validators.pattern('(?=.*?[0-9])(?=.*?[A-Z]).+'));
  

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
