import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { MessageResponseDTO } from '../../dto';
import { Observable } from 'rxjs';
import { PaymentDTO } from '../../dto/order/payment.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/payment';
  }

  public createPaymentForOrder(
    orderID: string,
    paymentDTO: PaymentDTO
  ): Observable<MessageResponseDTO> {
    const httpParams = new HttpParams().set('id', orderID);
    return this.http.post<MessageResponseDTO>(this.apiUrl, paymentDTO, {
      params: httpParams,
    });
  }

  public getAvailablePaymentTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + '/types');
  }
}
