import { Component, OnInit} from '@angular/core';
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
  public model: Account = {
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

  public createAccount(): void {
    this.accService.register(this.model).subscribe(
      result => {
        if (!result.message.toUpperCase().includes('ALREADY EXISTS')) {
          this.router.navigate(['/account/login']);
        }
        this.snackBar.open(result.message);
       },
      error => {
        if (!error) {
          this.snackBar.open('Error creating account !');
        }
        this.snackBar.open(error);
       }
    );
  }
}
