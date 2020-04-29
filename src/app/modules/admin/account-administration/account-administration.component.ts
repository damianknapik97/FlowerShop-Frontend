import { Component, Input, OnInit } from '@angular/core';

import { AccountAdministrationService } from 'src/app/core/services/administration/account-administration.service';
import { AccountAdministrativeDetailsDTO } from 'src/app/core/dto/administration/account-administrative-details.dto';
import { MatSnackBar } from '@angular/material';
import { RestPage } from 'src/app/core/dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-administration',
  templateUrl: './account-administration.component.html',
  styleUrls: ['./account-administration.component.sass'],
})
export class AccountAdministrationComponent implements OnInit {
  @Input() public page = 1;
  @Input() public pageSize = 10;
  @Input() public collectionSize = 0;
  @Input() public sortingProperties: string[] = ['NONE'];
  @Input() public currentSorting = 'NONE';
  public dataLoaded = false;
  public content: AccountAdministrativeDetailsDTO[];

  constructor(
    private accountAdministrationService: AccountAdministrationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.retrieveContent(this.page, this.pageSize, this.currentSorting);
  }

  public navigate(accountID: string) {
    this.router.navigate([
      'admin',
      'account-administration',
      'account-details',
      accountID,
    ]);
  }

  public reloadConent(page: number, pageSize: number, sortingProperty: string) {
    this.retrieveContent(page, pageSize, sortingProperty);
    this.snackBar.open('Table data refreshed', 'Information', {
      duration: 2500,
    });
  }

  public retrieveContent(
    page: number,
    pageSize: number,
    sortingProperty: string
  ): void {
    this.accountAdministrationService
      .retrieveAccountsPage(page, pageSize, sortingProperty)
      .subscribe((result: RestPage<AccountAdministrativeDetailsDTO>) => {
        this.pageSize = pageSize;
        this.content = result.content;
        this.collectionSize = result.totalElements;
        this.dataLoaded = true;
      });
  }
}
