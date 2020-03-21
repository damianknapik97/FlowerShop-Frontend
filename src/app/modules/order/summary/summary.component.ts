import { Component, OnInit, Input} from '@angular/core';
import { OrderService } from 'src/app/core/services';
import { OrderDTO } from 'src/app/core/dto/order';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Price } from 'src/app/core/dto';
import { ShippingService } from 'src/app/core/services/shipping.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass']
})
export class SummaryComponent implements OnInit {
  private orderID: string;
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
      apartmentNumber: ''
    },
    shoppingCartDTO: {
      id: '',
      name: '',
      flowerOrderDTOs: [],
      occasionalArticleOrderDTOs: [],
      souvenirOrderDTOs: []
    },
    paymentDTO: {
      id: '',
      paymentType: '',
      totalPrice: {
        amount: 0,
        currency: 'Undefined'
      }
    },
    placementDate: '',
    additionalNote: ''
  };

  constructor(private orderService: OrderService,
              private shippingService: ShippingService,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.orderID = this.orderService.getNewOrderID();
    this.deliveryPrice = this.shippingService.getShippingPrice();
    this.retrieveOrder(this.orderID);
  }

  ngOnInit() {}

  private retrieveOrder(orderID: string): void {
    this.orderService.retrieveNewOrder(orderID).subscribe(
      res => {
        this.orderDTO = res;
      },
      err => {
        this.router.navigate(['/']).then(
          () => {
            console.log(err);
            this.snackBar.open('Couldn\' retrieve newly created order from the database', 'Error', {duration: 3000});
          }
        );
      }
    );
  }

  public validateOrder(): void {
    this.orderService.validateOrderAndChangeItsStatus(this.orderID).subscribe(
      res => {
        this.router.navigate(['/']).then(
          () => {
            this.snackBar.open('New order submited succesfully', 'Information', {duration: 3000});
          });
      },
      err => {
        this.router.navigate(['/']).then(
          () => {
            console.log(err);
            this.snackBar.open('Couldn\' validate your new order and therefore submit it', 'Error', {duration: 3000});
          });
      });
  }

}
