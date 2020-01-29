import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ShoppingCartDTO } from 'src/app/core/dto';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: 'shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {
  public message = 'Loading...';
  public shoppingCart: ShoppingCartDTO;

  constructor(private service: ShoppingCartService) { }

  ngOnInit() {
    this.retrieveShoppingCartData();
  }

  private retrieveShoppingCartData(): void {
    this.service.getShoppingCart().subscribe(
      result => {
        this.message = '';
        this.service.initializeMissingArrays(result);
        this.shoppingCart = result;


        console.log(this.shoppingCart.occasionalArticleOrderList.length);

      },
      error => {
        this.message = error;

      }
    )
  }

}
