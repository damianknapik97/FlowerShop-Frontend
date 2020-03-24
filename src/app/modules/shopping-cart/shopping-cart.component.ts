import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ShoppingCartDTO, FlowerOrderDTO, OccasionalArticleOrderDTO, SouvenirOrderDTO, OrderDTO } from 'src/app/core/dto/order';
import { Price, FlowerDTO, MessageResponseDTO } from 'src/app/core/dto';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { ShippingService } from 'src/app/core/services/shipping.service';
import { OrderService } from 'src/app/core/services';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: 'shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass']
})
export class ShoppingCartComponent implements OnInit {
  public dataLoaded = false;
  public shoppingCart: ShoppingCartDTO;
  public shipping: Price = {amount: 5, currency: ''};
  public totalPrice: Price = {amount: 0, currency: ''};
  public totalNumberOfProducts$: Observable<number>;

  public continueButtonContent = 'Checkout';
  public continueButtonInvisible = true;
  public continueButtonClass = 'button-success';

  constructor(private service: ShoppingCartService,
              private orderService: OrderService,
              private shippingService: ShippingService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.shipping = this.shippingService.getShippingPrice();
    this.retrieveShoppingCartData()
    .then(
      () => {
        this.checkIfThereIsUnfinishedOrder();
        this.dataLoaded = true;
      }
    )
    .catch(
      (err: any) => {
        console.log('err');
        this.snackBar.open('Couldn\'t retrieve shopping cart data', 'Error', {duration: 3000});
      }
    );
  }

  private checkIfThereIsUnfinishedOrder(): void {
    this.orderService.retrieveUnfinishedOrder().subscribe(
      (res: OrderDTO) => {
        if (res != null) {
          this.continueButtonContent = 'Continue your unfinished order';
          this.continueButtonInvisible = false;
          this.continueButtonClass = 'btn-warning';
        } else {
          this.continueButtonContent = 'Checkout';
          this.continueButtonClass = 'btn-success';
        }
      }
    );
  }

  private retrieveShoppingCartData(): Promise<void> {
    return this.service.getShoppingCart().toPromise().then(
      (result: ShoppingCartDTO) => {
        this.service.initializeMissingArrays(result);
        this.shoppingCart = result;
        this.recountTotalPrice();
        this.continueButtonInvisible = this.service.isShoppingCartEmpty(this.shoppingCart);
      });
  }

  private recountTotalPrice(): void {
    this.service.countTotalPriceWithDelivery(this.shoppingCart.id, this.shipping).then(
      (value: Price) => {
        this.totalPrice = value;
      }
    );
  }

  public deleteFlowerOrder(flowerOrder: FlowerOrderDTO): void {
    this.service.deleteFlowerOrder(flowerOrder.id).subscribe(
      (result: MessageResponseDTO) => {
        const indexToRemove = this.shoppingCart.flowerOrderDTOs.indexOf(flowerOrder);
        this.shoppingCart.flowerOrderDTOs.splice(indexToRemove, 1);
        this.recountTotalPrice();
        this.continueButtonInvisible = this.service.isShoppingCartEmpty(this.shoppingCart);
        this.snackBar.open(result.message, '', {duration: 1500});

      },
      (error: any) => {
        this.snackBar.open(error, 'Error', {duration: 1500});
      }
    );
  }

  public deleteOccasionalArticleOrder(occasionalArticleOrder: OccasionalArticleOrderDTO): void {
    this.service.deleteOccasionalArticleOrder(occasionalArticleOrder.id).subscribe(
      (result: MessageResponseDTO) => {
        const indexToRemove = this.shoppingCart.occasionalArticleOrderDTOs.indexOf(occasionalArticleOrder);
        this.shoppingCart.occasionalArticleOrderDTOs.splice(indexToRemove, 1);
        this.recountTotalPrice();
        this.continueButtonInvisible = this.service.isShoppingCartEmpty(this.shoppingCart);
        this.snackBar.open(result.message, '', {duration: 1500});

      },
      (error: any) => {
        this.snackBar.open(error, 'Error', {duration: 1500});
      }
    );
  }

  public deleteSouvenirOrder(souvenirOrder: SouvenirOrderDTO): void {
    this.service.deleteOccasionalArticleOrder(souvenirOrder.id).subscribe(
      (result: MessageResponseDTO) => {
        const indexToRemove = this.shoppingCart.souvenirOrderDTOs.indexOf(souvenirOrder);
        this.shoppingCart.souvenirOrderDTOs.splice(indexToRemove, 1);
        this.recountTotalPrice();
        this.continueButtonInvisible = this.service.isShoppingCartEmpty(this.shoppingCart);
        this.snackBar.open(result.message, '', {duration: 1500});

      },
      (error: any) => {
        this.snackBar.open(error, 'Error', {duration: 1500});
      }
    );
  }

}
