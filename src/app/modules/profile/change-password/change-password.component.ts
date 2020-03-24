import { Component, OnInit } from '@angular/core';
import { PasswordChangeDTO } from 'src/app/core/dto/account';
import { AccountService } from 'src/app/core/services';
import {MatchStringValidatorDirective } from 'src/app/core/directives/match-string.directive';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {
  public model: PasswordChangeDTO = {
     currentPassword: '',
     newPassword: '',
     newPasswordConfirmation: ''
  };

  constructor(private accService: AccountService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public updatePassword(): void {
    this.accService.updatePassword(this.model).subscribe(
      response => {
        this.snackBar.open('Password updated successfully', 'Information', {duration: 3000});
      },
      error => {
        this.snackBar.open('Couldn\'t update your password', 'Error', {duration: 3000});
      }
    );
  }

}
