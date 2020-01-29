import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AccountDTO } from 'src/app/core/dto/account';
import { AccountService } from 'src/app/core/services';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.sass']
})

export class RegisterComponent implements OnInit {


  public checkBoxValue: boolean;
  public model: AccountDTO = {
    name: '',
    email: '',
    password: '',
    role: 'USER',
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
