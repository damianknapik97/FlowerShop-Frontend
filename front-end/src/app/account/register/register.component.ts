import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';

import axios from 'axios';
import { AxiosInstance } from 'axios';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  private axios: AxiosInstance;

  model: AccountViewModel = {
    name: '',
    password: '',
    email: '',
    role: 'User'
  };

  constructor(private router: Router) {

   }

  ngOnInit() {
  }
  createAccount3(): void {
    alert(this.model.name)
  }

  createAccount(): void {
    const url = 'http://localhost:8080/account/register';
    this.axios.post(url, this.model)
  }

}

export interface AccountViewModel {
  name: string;
  password: string;
  email: string;
  role: string;

}
