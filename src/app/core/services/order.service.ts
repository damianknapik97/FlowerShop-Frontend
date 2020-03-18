import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ShoppingCartService } from './shopping-cart.service';
import { OrderDTO } from '../dto/order/order.dto';
import { Observable } from 'rxjs';
import { ShoppingCartDTO, OrderDetailsDTO } from '../dto/order';
import { MessageResponseDTO, RestPage, Price } from '../dto';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl: string;
  private newOrderID = '';  // Multiple services require OrderID in order to process their requests.


  constructor(private http: HttpClient,
              private shoppingCartService: ShoppingCartService,
              private router: Router,
              private snackBar: MatSnackBar) {
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

  public updateOrderDetails(orderID: string, orderDetails: OrderDetailsDTO): Observable<MessageResponseDTO> {
    const httpParams = new HttpParams().set('id', orderID);
    return this.http.put<MessageResponseDTO>(this.apiUrl + '/details', orderDetails, {params: httpParams});
  }

  public retrieveNewOrder(orderID: string): Observable<OrderDTO> {
    const httpParams = new HttpParams().set('id', orderID);
    return this.http.get<OrderDTO>(this.apiUrl, {params: httpParams});
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

  /**
   * Retrieve currently handled Order ID, that user inputs will be added to.
   * If no order id is present, redirect to front page with pop up bar explaining the situation.
   */
  public getNewOrderID(): string {
    if (!this.validateOrderID(this.newOrderID)) {
      this.router.navigate(['/']).then<void>(
        (value: boolean) => {
          this.snackBar.open('No new order detected', 'Error', {duration: 3000});
        });
    }
    return this.newOrderID;
  }
}
