import { Component, OnInit } from '@angular/core';
import { PasswordChangeViewModel } from 'src/app/core/viewmodels/account';
import { AccountService } from 'src/app/core/services';

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {

  public message: string = '';
  public model: PasswordChangeViewModel = {
     currentPassword: '',
     newPassword: '',
     newPasswordConfirmation: ''
  };

  constructor(private accService: AccountService) { }

  ngOnInit() {
  }

  public updatePassword(): void {
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
