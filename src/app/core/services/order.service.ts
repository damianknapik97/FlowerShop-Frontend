import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ShoppingCartService } from './shopping-cart.service';
import { OrderDTO } from '../dto/order/order.dto';
import { Observable } from 'rxjs';
import { ShoppingCartDTO } from '../dto/order';
import { MessageResponseDTO, RestPage } from '../dto';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl: string;

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

  public retrieveOrdersPage(page: number) {
    const httpParams = new HttpParams().set('page', page.toString());
    return this.http.get<RestPage<OrderDTO>>(this.apiUrl + '/page', {params: httpParams});
  }
}
