import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ShoppingCartService } from './shopping-cart.service';
import { OrderDTO } from '../dto/order/order.dto';
import { Observable } from 'rxjs';
import { ShoppingCartDTO } from '../dto/order';
import { MessageResponseDTO, RestPage, Price } from '../dto';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl: string;
  private newOrderID = '';  // Multiple services require OrderID in order to process their requests.


  constructor(private http: HttpClient,
              private shoppingCartService: ShoppingCartService) {
    this.apiUrl = environment.apiUrl + '/order';
  }

  public createOrderFromCurrentShoppingCart(): Observable<MessageResponseDTO> {
    return this.http.post<OrderDTO>(this.apiUrl, null);
  }

  public updateOrder(orderDTO: OrderDTO): Observable<MessageResponseDTO> {
    return this.http.put<MessageResponseDTO>(this.apiUrl, orderDTO);
  }

  public retrieveOrdersPage(page: number): Observable<RestPage<OrderDTO>> {
    const httpParams = new HttpParams().set('page', page.toString());
    return this.http.get<RestPage<OrderDTO>>(this.apiUrl + '/page', {params: httpParams});
  }

  public retrieveShoppingCartID(orderID: string): Observable<string> {
    const httpParams = new HttpParams().set('id', orderID);
    return this.http.get<string>(this.apiUrl + '/shopping-cart', {params: httpParams});
  }

  /**
   * Check if provided OrderID is a valid string,
   * return true if provided string is not null and its lenght is greater than 0;
   *
   * @param orderID - ID to check
   */
  public validateOrderID(orderID: string): boolean {
    if (orderID == null && orderID.length < 0) {
      return false;
    }
    return true;
  }

  public setNewOrderID(orderID: string): void {
    this.newOrderID = orderID;
  }

  public getNewOrderID(): string {
    return this.newOrderID;
  }
}
