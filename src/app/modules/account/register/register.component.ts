import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/core/viewmodels/account';
import { AccountService } from 'src/app/core/services';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.sass']
})

export class RegisterComponent implements OnInit {


  public checkBoxValue: boolean;
  private model: Account = {
    name: '',
    email: '',
    password: '',
    role: 'user',
  };

  constructor(private router: Router,
              private accService: AccountService,
              private snackBar: MatSnackBar) {
    this.checkBoxValue = false;
   }

  ngOnInit() { }

  createAccount(): void {
    this.accService.register(this.model).subscribe(
      result => {
        this.router.navigate(['/account/login']);
        this.snackBar.open(result);
       },
      error => {
        this.snackBar.open(error);
       }
    );
  }
}
