import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AccountDTO } from 'src/app/core/dto/account';
import { AccountService } from 'src/app/core/services';
import { MatSnackBar } from '@angular/material';
import { AccountRole } from 'src/app/core/constants/account-role.enum';



@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.sass']
})

export class RegisterComponent implements OnInit {
  @Input() public checkBoxValue: boolean;
  @Input() public model: AccountDTO = {
    name: '',
    email: '',
    password: '',
    role: AccountRole.ROLE_USER,
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
          this.router.navigate(['/account/login']).then(
            (redirected: boolean) => {
              this.snackBar.open(result.message, 'Information', {duration: 3000});
          });
        } else {
          this.snackBar.open(result.message, 'Information', {duration: 3000});
        }
       },
      error => {
        console.log(error);
        this.snackBar.open('Couldn\'t create account for provided details !', 'Error', {duration: 3000});
       }
    );
  }
}
