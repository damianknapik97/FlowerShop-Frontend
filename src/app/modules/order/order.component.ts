import { Component, OnInit, Input } from '@angular/core';
import { OrderService, ShoppingCartService } from 'src/app/core/services';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  constructor(private orderService: OrderService,
              private shoppingCartService: ShoppingCartService) {
   }

  ngOnInit() {
  }

}
