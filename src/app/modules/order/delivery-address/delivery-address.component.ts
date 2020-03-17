import { Component, OnInit, Input } from '@angular/core';
import { DeliveryAddressDTO } from 'src/app/core/dto/order/delivery-address.dto';
import { DeliveryAddressService, OrderService } from 'src/app/core/services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.sass']
})
export class DeliveryAddressComponent implements OnInit {
  private orderID: string;
  @Input() public deliveryAddressDTO: DeliveryAddressDTO = {
    id: '',
    cityName: '',
    zipCode: '',
    streetName: '',
    houseNumber: '',
    apartmentNumber: ''
  };

  constructor(private service: DeliveryAddressService,
              private orderService: OrderService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.orderID = this.orderService.getNewOrderID();
    if (!this.orderService.validateOrderID(this.orderID)) {
      this.router.navigate(['/']).then(
        () => {
          this.snackBar.open('No new order detected', 'Error', {duration: 3000});
        });
    }
  }

  ngOnInit() {
  }


   /**
    * Send request to create Delivery Address and attach it to provided Order by utilizing Order ID passed to this component
    */
  public addDeliveryAddressToOrder(): void {
    this.service.createDeliveryAddressForOrder(this.orderID, this.deliveryAddressDTO).subscribe(
      result => {
        this.router.navigate(['/order/details']);
      },
      error => {
        this.router.navigate(['/']).then(
          (redirected: boolean) => {
            if (redirected) {
              console.log(error);
              this.snackBar.open('Couldn\'t add delivery address to your order', 'Error', {duration: 3000});
            }
          }
        );
      }
    );
  }

}
