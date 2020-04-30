import { Injectable } from '@angular/core';
import { PaymentService } from '../../services';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PaymentTypeResolve implements Resolve<string[]> {
  constructor(private paymentService: PaymentService) {}

  public resolve() {
    return this.paymentService.getAvailablePaymentTypes();
  }
}
