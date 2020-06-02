import { HttpClient, HttpParams } from '@angular/common/http';

import { DeliveryAddressDTO } from '../../dto/order/delivery-address.dto';
import { Injectable } from '@angular/core';
import { MessageResponseDTO } from '../../dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DeliveryAddressService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/delivery-address';
  }

  public createDeliveryAddressForOrder(
    orderID: string,
    deliveryAddressDTO: DeliveryAddressDTO
  ): Observable<MessageResponseDTO> {
    const httpParams = new HttpParams().set('id', orderID);
    return this.http.post<MessageResponseDTO>(this.apiUrl, deliveryAddressDTO, {
      params: httpParams,
    });
  }
}
