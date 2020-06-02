import { Component, Input, OnInit } from '@angular/core';

import { DeliveryAddressDTO } from 'src/app/core/dto/order/delivery-address.dto';
import { DeliveryAddressService } from 'src/app/core/services/order/delivery-address.service';
import { MatSnackBar } from '@angular/material';
import { OrderService } from 'src/app/core/services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.sass'],
})
export class DeliveryAddressComponent implements OnInit {
  @Input() public deliveryAddressDTO: DeliveryAddressDTO = {
    id: '',
    cityName: '',
    zipCode: '',
    streetName: '',
    houseNumber: '',
    apartmentNumber: '',
  };

  constructor(
    private service: DeliveryAddressService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {}

  public removeOrder(): void {
    this.orderService.removeOrderAndRedirect(
      this.orderService.getNewOrderID(),
      '/',
      'Order removed succesfully'
    );
  }

  /**
   * Send request to create Delivery Address and attach it to provided Order by utilizing Order ID passed to this component
   */
  public addDeliveryAddressToOrder(): void {
    this.service
      .createDeliveryAddressForOrder(
        this.orderService.getNewOrderID(),
        this.deliveryAddressDTO
      )
      .subscribe(
        (result) => {
          this.router.navigate(['/order/details']);
        },
        (error) => {
          this.router.navigate(['/']).then((redirected: boolean) => {
            if (redirected) {
              console.log(error);
              this.snackBar.open(
                "Couldn't add delivery address to your order",
                'Error',
                { duration: 3000 }
              );
            }
          });
        }
      );
  }
}
