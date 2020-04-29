import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageResponseDTO, RestPage } from '../../dto';

import { AccountAdministrativeDetailsDTO } from '../../dto/administration/account-administrative-details.dto';
import { AccountEmployeeDetailsDTO } from '../../dto/administration/account-employee-details.dto';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountAdministrationService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/account-administration';
  }

  public retrieveEmployeAccDetails(
    orderID: string
  ): Observable<AccountEmployeeDetailsDTO> {
    const httpParams = new HttpParams().set('id', orderID);
    return this.http.get<AccountEmployeeDetailsDTO>(this.apiUrl + '/order', {
      params: httpParams,
    });
  }

  public retrieveAccountsPage(
    page: number,
    numberOfElements: number,
    sorting: string
  ): Observable<RestPage<AccountAdministrativeDetailsDTO>> {
    const httpParams = new HttpParams()
      .set('page', (page - 1).toString())
      .set('numberOfElements', numberOfElements.toString())
      .set('sorting', sorting);
    return this.http.get<RestPage<AccountAdministrativeDetailsDTO>>(
      this.apiUrl + '/page',
      { params: httpParams }
    );
  }

  public retrieveAccountAdministrativeDetails(
    accountID: string
  ): Observable<AccountAdministrativeDetailsDTO> {
    const httpParams = new HttpParams().set('id', accountID.toString());
    return this.http.get<AccountAdministrativeDetailsDTO>(this.apiUrl, {
      params: httpParams,
    });
  }

  public updateAccountAdministrativeDetails(
    accountAdministrativeDetails: AccountAdministrativeDetailsDTO
  ): Observable<MessageResponseDTO> {
    return this.http.put<MessageResponseDTO>(
      this.apiUrl,
      accountAdministrativeDetails
    );
  }

  public retrieveSortingProperties(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + '/sorting');
  }

  public retrieveAccountRoles(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + '/roles');
  }
}
