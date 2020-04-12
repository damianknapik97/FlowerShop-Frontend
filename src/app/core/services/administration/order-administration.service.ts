import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RestPage } from '../../dto';
import { OrderDTO } from '../../dto/order';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class OrderAdministrationService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/order-administration';
  }

  retriveSortingProperties(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + '/page/sorting-properties');
  }

  retrieveOrdersPage(page: number, numberOfElements: number, sortingProperty: string): Observable<RestPage<OrderDTO>> {
    const httpParams = new HttpParams()
      .set('page', page.toString())
      .set('elements', numberOfElements.toString())
      .set('sorting', sortingProperty);
    return this.http.get<RestPage<OrderDTO>>(this.apiUrl, {params: httpParams});
  }

  updateOrdersPage(page: number, numberOfElements: number, sortingProperty: string,
                   ordersPage: RestPage<OrderDTO>): Observable<RestPage<OrderDTO>> {
    const httpParams = new HttpParams()
      .set('page', page.toString())
      .set('elements', element.toString())
      .set('sorting', sortingProperty);
    return this.http.put<RestPage<OrderDTO>>(this.apiUrl + '/page', ordersPage, {params: httpParams});
  }
}
