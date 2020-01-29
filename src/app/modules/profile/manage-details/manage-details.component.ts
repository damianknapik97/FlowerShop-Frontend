import { Component, OnInit } from '@angular/core';
import { AccountDetailsDTO } from 'src/app/core/dto/account';
import { AuthenticationService } from 'src/app/core/security';
import { AccountService } from 'src/app/core/services';

@Component({
  selector: 'app-manage-details',
  templateUrl: 'manage-details.component.html',
  styleUrls: ['./manage-details.component.sass']
})
export class ManageDetailsComponent implements OnInit {

  public message: string = '';
  public model: AccountDetailsDTO = {
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
        this.message = "Account updated succesfully!"
      },
      error => {
        this.message = "Account updated failed !"
      }
    );
  }
}
