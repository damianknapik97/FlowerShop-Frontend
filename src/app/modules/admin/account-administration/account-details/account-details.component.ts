import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { AccountAdministrationService } from 'src/app/core/services/administration/account-administration.service';
import { AccountAdministrativeDetailsDTO } from 'src/app/core/dto/administration/account-administrative-details.dto';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { MessageResponseDTO } from 'src/app/core/dto';

// TODO: Updating currently logged user account, causes backend to crash

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.sass'],
})
export class AccountDetailsComponent implements OnInit {
  private contentLoaded = true;
  private accountDetailsCollapsed = false;
  private accountDetailsEditable = false;
  private changesAvailableForProcessing = false;
  private accountRoles: string[];
  private accountDetails: AccountAdministrativeDetailsDTO = {
    id: '',
    name: '',
    creationDate: '',
    email: '',
    password: '',
    role: null,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private accountAdministrativeService: AccountAdministrationService
  ) {
    this.accountRoles = this.activatedRoute.snapshot.data['accountRoles'];
    activatedRoute.params.subscribe((result: any) => {
      this.retrieveAccountDetails();
    });
  }

  ngOnInit() {}

  public saveChanges(): void {
    this.accountAdministrativeService
      .updateAccountAdministrativeDetails(this.accountDetails)
      .subscribe(
        (res: MessageResponseDTO) => {
          this.snackBar.open(res.message, 'Information', { duration: 3500 });
          this.retrieveAccountDetails();
        },
        (err: any) => {
          this.snackBar.open(
            "Couldn't save provided account details",
            'Error',
            { duration: 3500 }
          );
        }
      );
  }

  public discardChanges(): void {
    this.contentLoaded = false;
    this.changesAvailableForProcessing = false;
    this.accountDetailsEditable = false;
    this.retrieveAccountDetails();
    this.snackBar.open('Changes discarded.', 'Information', { duration: 3500 });
  }

  private retrieveAccountDetails(): void {
    this.contentLoaded = false;
    this.accountDetailsEditable = false;
    this.changesAvailableForProcessing = false;
    const accountID = this.activatedRoute.snapshot.url[1].path;
    this.accountAdministrativeService
      .retrieveAccountAdministrativeDetails(accountID)
      .subscribe(
        (res: AccountAdministrativeDetailsDTO) => {
          this.accountDetails = res;
          this.contentLoaded = true;
        },
        (err: any) => {
          console.log(err);
          this.snackBar.open("Couldn't retrieve account details", 'Error', {
            duration: 3500,
          });
        }
      );
  }
}
