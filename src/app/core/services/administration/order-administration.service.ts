import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageResponseDTO, RestPage } from '../../dto';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDTO } from '../../dto/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderAdministrationService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/order-administration';
  }

  retriveSortingProperties(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + '/page/sorting-properties');
  }

  retrieveOrdersPage(
    page: number,
    numberOfElements: number,
    sortingProperty: string
  ): Observable<RestPage<OrderDTO>> {
    const httpParams = new HttpParams()
      .set('page', page.toString())
      .set('elements', numberOfElements.toString())
      .set('sorting', sortingProperty);
    return this.http.get<RestPage<OrderDTO>>(this.apiUrl + '/page', {
      params: httpParams,
    });
  }

  updateOrdersPage(
    page: number,
    numberOfElements: number,
    sortingProperty: string,
    ordersPage: RestPage<OrderDTO>
  ): Observable<RestPage<OrderDTO>> {
    const httpParams = new HttpParams()
      .set('page', page.toString())
      .set('elements', numberOfElements.toString())
      .set('sorting', sortingProperty);
    return this.http.put<RestPage<OrderDTO>>(
      this.apiUrl + '/page',
      ordersPage,
      { params: httpParams }
    );
  }

  retrieveOrder(id: string): Observable<OrderDTO> {
    const httpParams = new HttpParams().set('id', id.toString());
    return this.http.get<OrderDTO>(this.apiUrl, { params: httpParams });
  }

  updateOrder(orderDTO: OrderDTO): Observable<MessageResponseDTO> {
    return this.http.put<MessageResponseDTO>(this.apiUrl, orderDTO);
  }
}
