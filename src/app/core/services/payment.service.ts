import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MessageResponseDTO } from '../dto';
import { PaymentDTO } from '../dto/order/payment.dto';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl + '/payment';
  }

  public createPaymentForOrder(orderID: string, paymentDTO: PaymentDTO): Observable<MessageResponseDTO> {
    const httpParams = new HttpParams().set('id', orderID);
    return this.http.post<MessageResponseDTO>(this.apiUrl, {body: paymentDTO}, {params: httpParams});
  }

}
