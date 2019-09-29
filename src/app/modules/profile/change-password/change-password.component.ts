import { Component, OnInit } from '@angular/core';
import { PasswordChangeViewModel } from 'src/app/core/viewmodels/account';
import { AccountService } from 'src/app/core/services';

@Component({
  selector: 'app-change-password',
  templateUrl: 'change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {

  private message: string = '';
  private model: PasswordChangeViewModel = {
     currentPassword: '',
     newPassword: '',
     newPasswordConfirmation: ''
  };

  constructor(private accService: AccountService) { }

  ngOnInit() {
  }

  private updatePassword(): void {
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
