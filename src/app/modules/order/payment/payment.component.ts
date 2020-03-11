import { Component, OnInit, Input } from '@angular/core';
import { PaymentService, OrderService } from 'src/app/core/services';
import { PaymentDTO } from 'src/app/core/dto/order/payment.dto';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PaymentType } from 'src/app/core/constants/payment-type.enum';

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
              private orderService: OrderService,
              private router: Router,
              private snackBar: MatSnackBar) {
    //this.retrieveOrderID();
    this.retrievePaymentTypes();
   }

   ngOnInit() {}

   private retrieveOrderID(): void {
    this.orderID = this.orderService.getNewOrderID();
    if (!this.orderService.validateOrderID(this.orderID)) {
      this.router.navigate(['/']).then(
        () => {
          this.snackBar.open('No new order detected', 'Error', {duration: 3000});
        });
    }
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
     this.service.createPaymentForOrder(this.orderID, this.paymentDTO).subscribe(
       res => {
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
