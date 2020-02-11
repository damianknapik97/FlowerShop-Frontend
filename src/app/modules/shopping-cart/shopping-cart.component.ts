import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ShoppingCartDTO } from 'src/app/core/dto/order';
import { Price } from 'src/app/core/dto';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: 'shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {
  public message = 'Loading...';
  public shoppingCart: ShoppingCartDTO;
  public shipping: Price;
  public totalPrice: Price;

  constructor(private service: ShoppingCartService) { }

  ngOnInit() {
    /* TODO: Add shipping */
    this.shipping = {amount: 5, currency: 'PLN'};
    this.retrieveShoppingCartData();
  }

  private retrieveShoppingCartData(): void {
    this.service.getShoppingCart().subscribe(
      result => {
        this.message = '';
        this.service.initializeMissingArrays(result);
        this.shoppingCart = result;
        this.recountTotalPrice();
      },
      error => {
        this.message = error;

      }
    )
  }

  private recountTotalPrice() {
    this.totalPrice = this.service.countTotalPrice(this.shoppingCart, this.shipping);
  }

}
