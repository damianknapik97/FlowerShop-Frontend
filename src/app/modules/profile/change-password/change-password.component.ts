import { Component, OnInit } from '@angular/core';
import { PasswordChangeDto } from 'src/app/core/dto/account';
import { AccountService } from 'src/app/core/services';
import {MatchStringValidatorDirective } from 'src/app/core/directives/match-string.directive';

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {

  public message: string = '';
  public model: PasswordChangeDto = {
     currentPassword: '',
     newPassword: '',
     newPasswordConfirmation: ''
  };

  constructor(private accService: AccountService) { }

  ngOnInit() {
  }

  public updatePassword(): void {
    console.log("test");
    this.accService.updatePassword(this.model).subscribe(
      response => {
        this.message = response;
      },
      error => {
        this.message = error;
      }
    );
  }

}
