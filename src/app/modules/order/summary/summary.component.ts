import { Component, OnInit, Input} from '@angular/core';
import { OrderService } from 'src/app/core/services';
import { OrderDTO } from 'src/app/core/dto/order';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
              private router: Router,
              private snackBar: MatSnackBar) {
    this.orderID = this.orderService.getNewOrderID();
    this.retrieveOrder(this.orderID);
  }

  ngOnInit() {}

  private retrieveOrder(orderID: string) {
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
        )
      }
    )

  }

}
