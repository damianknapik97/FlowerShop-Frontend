import { Component, OnInit } from '@angular/core';
import { AccountDetailsDTO } from 'src/app/core/dto/account';
import { AccountService } from 'src/app/core/services';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-manage-details',
  templateUrl: 'manage-details.component.html',
  styleUrls: ['./manage-details.component.sass']
})
export class ManageDetailsComponent implements OnInit {
  public model: AccountDetailsDTO = {
    email: ''
  };

  constructor(private accService: AccountService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.retrieveAccountDetails();
  }

  public updateInformations(): void {
    this.accService.updateDetails(this.model).subscribe(
      result => {
        this.retrieveAccountDetails();
        this.snackBar.open('Account updated successfully', 'Information', {duration: 3000});
      },
      error => {
        this.snackBar.open('Account updated failed', 'Error', {duration: 3000});
      }
    );
  }

  private retrieveAccountDetails(): void {
    this.accService.getDetails().subscribe(
      result => {
        this.model = result;
      },
      error => {
        this.snackBar.open('Couldn\'t retrieve your account details', 'Error', {duration: 3000});
      });
  }
}
