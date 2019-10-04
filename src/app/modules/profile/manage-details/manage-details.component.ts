import { Component, OnInit } from '@angular/core';
import { AccountDetailsViewModel } from 'src/app/core/viewmodels/account';
import { AuthenticationService } from 'src/app/core/security';
import { AccountService } from 'src/app/core/services';

@Component({
  selector: 'app-manage-details',
  templateUrl: 'manage-details.component.html',
  styleUrls: ['./manage-details.component.sass']
})
export class ManageDetailsComponent implements OnInit {

  public message: string = '';
  public model: AccountDetailsViewModel = {
    email: ''
  };

  constructor(private authService: AuthenticationService,
              private accService: AccountService) { }

  ngOnInit() {
    this.accService.getDetails().subscribe(
      result => {
        this.model = result;
      },
      error => {
        this.message = error;
      }
    )
  }

  public updateInformations(): void {
    this.accService.updateDetails(this.model).subscribe(
      result => {
        this.message = result;
      },
      error => {
        this.message = error;
      }
    ).add(
      () => {
        location.reload();
      }
    );
  }
}
