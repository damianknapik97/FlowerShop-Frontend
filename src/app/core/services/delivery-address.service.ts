import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageResponseDTO } from '../dto';
import { Observable } from 'rxjs';
import { DeliveryAddressDTO } from '../dto/order/delivery-address.dto';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAddressService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/delivery-address';
  }

  public createDeliveryAddressForOrder(orderID: string, deliveryAddressDTO: DeliveryAddressDTO): Observable<MessageResponseDTO> {
    const httpParams = new HttpParams().set('id', orderID);
    return this.http.put<MessageResponseDTO>(this.apiUrl, {body: deliveryAddressDTO}, {params: httpParams});
  }
}
