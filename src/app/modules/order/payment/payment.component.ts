import { Component, OnInit, Input } from '@angular/core';
import { PaymentService, OrderService, ShoppingCartService } from 'src/app/core/services';
import { PaymentDTO } from 'src/app/core/dto/order/payment.dto';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PaymentType } from 'src/app/core/constants/payment-type.enum';
import { Price } from 'src/app/core/dto';
import { ShippingService } from 'src/app/core/services/shipping.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html' ,
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent implements OnInit {
  private orderID: string;
  public paymentTypes: string[];
  @Input() public paymentDTO: PaymentDTO = {
    id: '',
    totalPrice: {amount: 0, currency: 'Undefined'},
    paymentType: ''
  };

  constructor(private service: PaymentService,
              private shoppingCartService: ShoppingCartService,
              private shippingService: ShippingService,
              private orderService: OrderService,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.orderID = this.retrieveOrderID();
    this.retrieveShoppingCartTotalPrice(this.orderID, this.shippingService.getShippingPrice());
    this.retrievePaymentTypes();
   }

   ngOnInit() {}

   private retrieveOrderID(): string {
    const orderID = this.orderService.getNewOrderID();
    if (!this.orderService.validateOrderID(orderID)) {
      this.router.navigate(['/']).then(
        () => {
          this.snackBar.open('No new order detected', 'Error', {duration: 3000});
        });
    }

    return orderID;
  }

  private retrieveShoppingCartTotalPrice(orderID: string, shippingPrice: Price): void {
    this.orderService.retrieveShoppingCartID(orderID).toPromise()
    .then((shoppingCartID: string) => {
      this.shoppingCartService.countTotalPriceWithDelivery(shoppingCartID, shippingPrice)
      .then(
        (totalPrice: Price) => {
          this.paymentDTO.totalPrice = totalPrice;
      })
      .catch(
        () => {
          this.router.navigate(['/']).then(
            () => {
              this.snackBar.open('Couldn\'t count total price for your order', 'Error', {duration: 3000});
          });
      });
    })
    .catch(
      () => {
        this.router.navigate(['/']).then(
          () => {
            this.snackBar.open('Couldn\'t retrieve shopping cart nested inside your order', 'Error', {duration: 3000});
          }
        );
    });
  }

   private retrievePaymentTypes(): void {
    this.service.getAvailablePaymentTypes().subscribe(
      res => {
        this.paymentTypes = res;
      },
      err => {
        this.router.navigate(['/']).then(
          () => {
            this.snackBar.open('Couldn\'t retrieve available payment types', 'Error', {duration: 3000});
          }
        );
      }
    );
   }

   public addPaymentToOrder(): void {
     console.log(this.paymentDTO.paymentType);
     this.service.createPaymentForOrder(this.orderID, this.paymentDTO).subscribe(
       res => {
         this.snackBar.open('SUCCESS', 'INFO', {duration: 8000});
         // TODO
       },
       err => {
         console.log(err);
         this.router.navigate(['/']).then(
           () => {
            this.snackBar.open('Couldn\'t add payment to your order', 'Error', {duration: 3000});
           }
         );
       }
     );
   }

}
