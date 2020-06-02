import { Injectable } from '@angular/core';
import { OrderDTO } from '../../dto/order';
import { OrderService } from '../../services/order/order.service';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UnfinishedOrderResolve implements Resolve<OrderDTO> {
  constructor(private orderService: OrderService) {}

  public resolve() {
    return this.orderService.retrieveUnfinishedOrder();
  }
}
