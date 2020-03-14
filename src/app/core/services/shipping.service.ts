import { Injectable } from '@angular/core';
import { Price } from '../dto';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private shippingPrice: Price;

  constructor() {
    this.shippingPrice = {amount: 5, currency: 'PLN'};
  }

  public getShippingPrice(): Price {
    return this.shippingPrice;
  }
}
