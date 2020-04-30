import { Injectable } from '@angular/core';
import { OrderAdministrationService } from '../../services/administration/order-administration.service';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderStatusesResolver implements Resolve<string[]> {
  constructor(private orderAdministrationService: OrderAdministrationService) {}

  public resolve() {
    return this.orderAdministrationService.retrieveOrderStatuses();
  }
}
