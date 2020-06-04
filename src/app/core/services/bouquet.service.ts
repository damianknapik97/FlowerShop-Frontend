import { HttpClient, HttpParams } from '@angular/common/http';

import { BouquetDTO } from '../dto/bouquet/bouquet.dto';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestPage } from '../dto/rest-page';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BouquetService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/bouquet';
  }

  /**
   * Retrieves single page of bouquets from database.
   *
   * @param pageNumber - which page should be retrieved
   * @param sorting - which sorting should be used, by default NONE is used.
   */
  public retrieveBouquetPage(
    pageNumber: number,
    sorting?: string
  ): Observable<RestPage<BouquetDTO[]>> {
    if (sorting == null) {
      sorting = 'NONE';
    }

    const httpParams = new HttpParams()
      .set('number', pageNumber.toString())
      .set('sorting', sorting);

    return this.http.get<RestPage<BouquetDTO[]>>(this.apiUrl + '/all', {
      params: httpParams,
    });
  }
}
