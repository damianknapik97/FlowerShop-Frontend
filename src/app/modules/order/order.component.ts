import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/core/services';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  public message = 'Creating your order. Please wait...';
  public orderID: string;

  constructor(private orderService: OrderService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.message = 'Creating your order. Please wait...';
    this.placeOrder();
   }

  ngOnInit() {}

  /**
   * Sent create order request, assign returned OrderID to orderService,
   * redirect further to delivery-address creation.
   *
   */
  private placeOrder(): void {
    this.orderService.createOrderFromCurrentShoppingCart().subscribe(
      result => {
        this.orderService.setNewOrderID(result.message);
        this.message = '';
        this.router.navigate(['/order/delivery-address']);

      },
      error => {
        this.message = '';
        this.router.navigate(['/shopping-cart']).then(
          (navigated: boolean) => {
            if (navigated) {
              console.log(error);
              this.snackBar.open('Couldn\'t create order from your shopping cart', 'Error', {duration: 3000});
            }
        });

      }
    );

  }

}
