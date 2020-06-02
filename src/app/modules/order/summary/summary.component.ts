import { Component, Input, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { OrderDTO } from 'src/app/core/dto/order';
import { OrderService } from 'src/app/core/services/order/order.service';
import { Price } from 'src/app/core/dto';
import { Router } from '@angular/router';
import { ShippingService } from 'src/app/core/services/order/shipping.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass'],
})
export class SummaryComponent implements OnInit {
  public resourcesLoaded = false;
  @Input() public shoppingCartCollapsed = false;
  @Input() public deliveryAddressCollapsed = false;
  @Input() public detailsCollapsed = false;
  @Input() public paymentCollapsed = false;
  public deliveryPrice: Price;
  public orderDTO: OrderDTO = {
    id: '',
    message: '',
    deliveryDate: '',
    deliveryAddressDTO: {
      id: '',
      cityName: '',
      zipCode: '',
      streetName: '',
      houseNumber: '',
      apartmentNumber: '',
    },
    shoppingCartDTO: {
      id: '',
      name: '',
      flowerOrderDTOs: [],
      occasionalArticleOrderDTOs: [],
      souvenirOrderDTOs: [],
    },
    paymentDTO: {
      id: '',
      paymentType: '',
      totalPrice: {
        amount: 0,
        currency: 'Undefined',
      },
      wasPaid: false,
    },
    placementDate: '',
    additionalNote: '',
    orderStatus: 'CREATED',
  };

  constructor(
    private orderService: OrderService,
    private shippingService: ShippingService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.deliveryPrice = this.shippingService.getShippingPrice();
    this.retrieveOrder(this.orderService.getNewOrderID());
  }

  public removeOrder(): void {
    this.orderService.removeOrderAndRedirect(
      this.orderService.getNewOrderID(),
      '/',
      'Order removed succesfully'
    );
  }

  private retrieveOrder(orderID: string): void {
    this.orderService.retrieveNewOrder(orderID).subscribe(
      (res) => {
        this.orderDTO = res;
        this.resourcesLoaded = true;
      },
      (err) => {
        this.router.navigate(['/']).then(() => {
          console.log(err);
          this.snackBar.open(
            "Couldn' retrieve newly created order from the database",
            'Error',
            { duration: 3000 }
          );
        });
      }
    );
  }

  public validateOrder(): void {
    this.orderService
      .validateOrderAndChangeItsStatus(this.orderService.getNewOrderID())
      .subscribe(
        (res) => {
          this.router.navigate(['/profile/display-orders']).then(() => {
            this.snackBar.open(
              'New order submited succesfully',
              'Information',
              { duration: 3000 }
            );
          });
        },
        (err) => {
          this.router.navigate(['/']).then(() => {
            console.log(err);
            this.snackBar.open(
              "Couldn' validate your new order and therefore submit it",
              'Error',
              { duration: 3000 }
            );
          });
        }
      );
  }
}
