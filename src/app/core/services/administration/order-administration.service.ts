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

  public retriveSortingProperties(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + '/page/sorting-properties');
  }

  public retrieveOrdersPage(
    page: number,
    numberOfElements: number,
    sortingProperty: string
  ): Observable<RestPage<OrderDTO>> {
    const httpParams = new HttpParams()
      .set('page', (page - 1).toString())
      .set('elements', numberOfElements.toString())
      .set('sorting', sortingProperty);
    return this.http.get<RestPage<OrderDTO>>(this.apiUrl + '/page', {
      params: httpParams,
    });
  }

  public updateOrdersPage(
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

  /**
   * Sends request with id as a param, and retrieves whole OrderDTO
   * related to mentioned id.
   */
  public retrieveOrder(id: string): Observable<OrderDTO> {
    const httpParams = new HttpParams().set('id', id.toString());
    return this.http.get<OrderDTO>(this.apiUrl, { params: httpParams });
  }

  /**
   * Sends request containing OrderDTO inside body. Mentioned entity after ensuring
   * correctness of provided details, will be updated and saved in database.
   */
  public updateOrder(orderDTO: OrderDTO): Observable<MessageResponseDTO> {
    return this.http.put<MessageResponseDTO>(this.apiUrl, orderDTO);
  }

  /**
   * Retrieves array of strings containing all possible statuses that
   * can be assigned to an existing order entity.
   */
  public retrieveOrderStatuses() {
    return this.http.get<string[]>(this.apiUrl + '/statuses');
  }
}
