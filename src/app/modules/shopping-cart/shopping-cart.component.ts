import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ShoppingCartDTO, FlowerOrderDTO, OccasionalArticleOrderDTO, SouvenirOrderDTO } from 'src/app/core/dto/order';
import { Price, FlowerDTO } from 'src/app/core/dto';
import { MatSnackBar } from '@angular/material';

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

  constructor(private service: ShoppingCartService,
              private snackBar: MatSnackBar) { }

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

  public deleteFlowerOrder(flowerOrder: FlowerOrderDTO) {
    this.service.deleteFlowerOrder(flowerOrder.id).subscribe(
      result => {
        const indexToRemove = this.shoppingCart.flowerOrderDTOs.indexOf(flowerOrder);
        this.shoppingCart.flowerOrderDTOs.splice(indexToRemove, 1);
        this.recountTotalPrice();
        this.snackBar.open(result.message, '', {duration: 1500});

      },
      error => {
        this.snackBar.open(error, 'Error', {duration: 1500});
      }
    );
  }

  public deleteOccasionalArticleOrder(occasionalArticleOrder: OccasionalArticleOrderDTO) {
    this.service.deleteOccasionalArticleOrder(occasionalArticleOrder.id).subscribe(
      result => {
        const indexToRemove = this.shoppingCart.occasionalArticleOrderDTOs.indexOf(occasionalArticleOrder);
        this.shoppingCart.occasionalArticleOrderDTOs.splice(indexToRemove, 1);
        this.recountTotalPrice();
        this.snackBar.open(result.message, '', {duration: 1500});

      },
      error => {
        this.snackBar.open(error, 'Error', {duration: 1500});
      }
    );
  }

  public deleteSouvenirOrder(souvenirOrder: SouvenirOrderDTO) {
    this.service.deleteOccasionalArticleOrder(souvenirOrder.id).subscribe(
      result => {
        const indexToRemove = this.shoppingCart.souvenirOrderDTOs.indexOf(souvenirOrder);
        this.shoppingCart.souvenirOrderDTOs.splice(indexToRemove, 1);
        this.recountTotalPrice();
        this.snackBar.open(result.message, '', {duration: 1500});

      },
      error => {
        this.snackBar.open(error, 'Error', {duration: 1500});
      }
    );
  }

}
