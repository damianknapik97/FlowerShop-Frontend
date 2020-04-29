import { AccountAdministrationService } from '../../services/administration/account-administration.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountRolesResolve implements Resolve<string[]> {
  constructor(
    private accountAdministrationService: AccountAdministrationService
  ) {}

  public resolve() {
    return this.accountAdministrationService.retrieveAccountRoles();
  }
}
