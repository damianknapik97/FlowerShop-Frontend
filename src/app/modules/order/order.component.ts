import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { OrderDTO } from 'src/app/core/dto/order';
import { OrderService } from 'src/app/core/services';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.sass'],
})
export class OrderComponent implements OnInit {
  public message = 'Creating your order. Please wait...';
  private unfinishedOrder: OrderDTO;

  constructor(
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const unfinishedOrder = activatedRoute.snapshot.data['unfinishedOrder'];
    if (!this.checkForUnfinishedOrder(unfinishedOrder)) {
      this.placeOrder();
    }
  }

  ngOnInit() {}

  /**
   * Determine which components are missing in provided OrderDTO,
   * if they are missing at all. After that, redirect to according page
   * or return boolean value with information revolving around Order retrieving status.
   */
  private checkForUnfinishedOrder(orderDTO: OrderDTO): boolean {
    /* Check if order was retrieved at all */
    if (orderDTO != null && orderDTO.id.length > 0) {
      /* Set orderID for chidlren components and determine which inputs are missing */
      this.orderService.setNewOrderID(orderDTO.id);
      this.message =
        'You have unfinished Order ! Please finish or cancel this order first.';
      const redirectionUrl =
        '/order/' + this.determineMissingComponents(orderDTO);

      /* Redirect to page handling missing information input */
      this.router.navigate([redirectionUrl]).then(() => {
        this.snackBar.open('You have unfinished order in progress', 'Warning', {
          duration: 3000,
        });
      });
      /* Order was found */
      return true;
    }
    /* Order not found, progressing */
    return false;
  }

  /**
   * Determine which informations are missing from provided OrderDTO,
   * and return according page name that handles input of this type of information.
   *
   * @param orderDTO - DTo to parse
   * @returns - url page name that handles input of missing information.
   */
  private determineMissingComponents(orderDTO: OrderDTO): string {
    if (orderDTO.deliveryAddressDTO == null) {
      return 'delivery-address';
    } else if (
      orderDTO.message == null ||
      orderDTO.message.length <= 0 ||
      orderDTO.deliveryDate == null ||
      orderDTO.deliveryDate.length <= 0
    ) {
      return 'details';
    } else if (orderDTO.paymentDTO == null) {
      return 'payment';
    } else {
      return 'summary';
    }
  }

  /**
   * Sent create order request, assign returned OrderID to orderService,
   * redirect further to delivery-address creation.
   *
   */
  private placeOrder(): void {
    this.orderService.createOrderFromCurrentShoppingCart().subscribe(
      (result) => {
        this.orderService.setNewOrderID(result.message);
        this.message = '';
        this.router.navigate(['/order/delivery-address']);
      },
      (error) => {
        this.message = '';
        this.router.navigate(['/shopping-cart']).then((navigated: boolean) => {
          if (navigated) {
            console.log(error);
            this.snackBar.open(
              "Couldn't create order from your shopping cart",
              'Error',
              { duration: 3000 }
            );
          }
        });
      }
    );
  }
}
