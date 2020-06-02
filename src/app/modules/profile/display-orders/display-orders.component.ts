import { Component, Input, OnInit } from '@angular/core';

import { OrderDTO } from 'src/app/core/dto/order';
import { OrderService } from 'src/app/core/services/order/order.service';
import { RestPage } from 'src/app/core/dto';

@Component({
  selector: 'app-display-orders',
  templateUrl: './display-orders.component.html',
  styleUrls: ['./display-orders.component.sass'],
})
export class DisplayOrdersComponent implements OnInit {
  @Input() public page = 0;
  @Input() public pageSize = 10;
  @Input() public collectionSize = 0;
  public dataLoaded = false;
  public content: OrderDTO[];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.retrieveOrdersPage(1);
  }

  public retrieveOrdersPage(page: number): void {
    this.orderService
      .retrieveOrdersPage(page)
      .subscribe((res: RestPage<OrderDTO>) => {
        this.pageSize = res.totalElements;
        this.collectionSize = res.totalPages;
        this.content = res.content;
        this.dataLoaded = true;
      });
  }
}
