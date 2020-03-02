import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ShoppingCartDTO, FlowerOrderDTO, OccasionalArticleOrderDTO, SouvenirOrderDTO } from 'src/app/core/dto/order';
import { Price, FlowerDTO } from 'src/app/core/dto';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: 'shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {
  public message = 'Loading...';
  public shoppingCart: ShoppingCartDTO;
  public shipping: Price = {amount: 0, currency: ''};
  public totalPrice: Price = {amount: 0, currency: ''};
  public totalNumberOfProducts$: Observable<number>;
  public isEmpty = true;

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
        this.isEmpty = this.service.isShoppingCartEmpty(this.shoppingCart);
      },
      error => {
        this.message = error;

      }
    )
  }

  private recountTotalPrice(): void {
    this.totalPrice = this.service.countTotalPrice(this.shoppingCart, this.shipping);
  }

  public deleteFlowerOrder(flowerOrder: FlowerOrderDTO): void {
    this.service.deleteFlowerOrder(flowerOrder.id).subscribe(
      result => {
        const indexToRemove = this.shoppingCart.flowerOrderDTOs.indexOf(flowerOrder);
        this.shoppingCart.flowerOrderDTOs.splice(indexToRemove, 1);
        this.recountTotalPrice();
        this.isEmpty = this.service.isShoppingCartEmpty(this.shoppingCart);
        this.snackBar.open(result.message, '', {duration: 1500});

      },
      error => {
        this.snackBar.open(error, 'Error', {duration: 1500});
      }
    );
  }

  public deleteOccasionalArticleOrder(occasionalArticleOrder: OccasionalArticleOrderDTO): void {
    this.service.deleteOccasionalArticleOrder(occasionalArticleOrder.id).subscribe(
      result => {
        const indexToRemove = this.shoppingCart.occasionalArticleOrderDTOs.indexOf(occasionalArticleOrder);
        this.shoppingCart.occasionalArticleOrderDTOs.splice(indexToRemove, 1);
        this.recountTotalPrice();
        this.isEmpty = this.service.isShoppingCartEmpty(this.shoppingCart);
        this.snackBar.open(result.message, '', {duration: 1500});

      },
      error => {
        this.snackBar.open(error, 'Error', {duration: 1500});
      }
    );
  }

  public deleteSouvenirOrder(souvenirOrder: SouvenirOrderDTO): void {
    this.service.deleteOccasionalArticleOrder(souvenirOrder.id).subscribe(
      result => {
        const indexToRemove = this.shoppingCart.souvenirOrderDTOs.indexOf(souvenirOrder);
        this.shoppingCart.souvenirOrderDTOs.splice(indexToRemove, 1);
        this.recountTotalPrice();
        this.isEmpty = this.service.isShoppingCartEmpty(this.shoppingCart);
        this.snackBar.open(result.message, '', {duration: 1500});

      },
      error => {
        this.snackBar.open(error, 'Error', {duration: 1500});
      }
    );
  }

}
