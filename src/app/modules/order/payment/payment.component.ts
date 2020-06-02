import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { OrderService } from 'src/app/core/services/order/order.service';
import { PaymentDTO } from 'src/app/core/dto/order/payment.dto';
import { PaymentService } from 'src/app/core/services/order/payment.service';
import { Price } from 'src/app/core/dto';
import { ShippingService } from 'src/app/core/services/order/shipping.service';
import { ShoppingCartService } from 'src/app/core/services/order/shopping-cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass'],
})
export class PaymentComponent implements OnInit {
  public resourcesLoaded = false;
  public paymentTypes: string[];
  @Input() public paymentDTO: PaymentDTO = {
    id: '',
    totalPrice: { amount: 0, currency: 'Undefined' },
    paymentType: '',
    wasPaid: false,
  };

  constructor(
    private service: PaymentService,
    private shoppingCartService: ShoppingCartService,
    private shippingService: ShippingService,
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.paymentTypes = activatedRoute.snapshot.data['paymentTypes'];
  }

  ngOnInit() {
    this.retrieveShoppingCartTotalPrice(
      this.orderService.getNewOrderID(),
      this.shippingService.getShippingPrice()
    );
  }

  public removeOrder(): void {
    this.orderService.removeOrderAndRedirect(
      this.orderService.getNewOrderID(),
      '/',
      'Order removed succesfully'
    );
  }

  private retrieveShoppingCartTotalPrice(
    orderID: string,
    shippingPrice: Price
  ): void {
    this.orderService
      .retrieveShoppingCartID(orderID)
      .toPromise()
      .then((shoppingCartID: string) => {
        this.shoppingCartService
          .countTotalPriceWithDelivery(shoppingCartID, shippingPrice)
          .then((totalPrice: Price) => {
            this.paymentDTO.totalPrice = totalPrice;
            this.resourcesLoaded = true;
          })
          .catch(() => {
            this.router.navigate(['/']).then(() => {
              this.snackBar.open(
                "Couldn't count total price for your order",
                'Error',
                { duration: 3000 }
              );
            });
          });
      })
      .catch(() => {
        this.router.navigate(['/']).then(() => {
          this.snackBar.open(
            "Couldn't retrieve shopping cart nested inside your order",
            'Error',
            { duration: 3000 }
          );
        });
      });
  }

  public addPaymentToOrder(): void {
    console.log(this.paymentDTO.paymentType);
    this.service
      .createPaymentForOrder(this.orderService.getNewOrderID(), this.paymentDTO)
      .subscribe(
        (res) => {
          this.router.navigate(['/order/summary']);
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/']).then(() => {
            this.snackBar.open("Couldn't add payment to your order", 'Error', {
              duration: 3000,
            });
          });
        }
      );
  }
}
