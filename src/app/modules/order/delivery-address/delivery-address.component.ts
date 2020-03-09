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
    this.validateOrderID();
  }

  ngOnInit() {
  }

  /**
   * Check if provided OrderID is a valid string,
   * return true if provided string is not null and its lenght is greater than 0;
   *
   * @param orderID - ID to check
   */

   private validateOrderID(): void {
     if (this.orderID == null && this.orderID.length < 0) {
       this.router.navigate(['/']).then(
         () => {
           this.snackBar.open('No new order created', 'Error', {duration: 300});
         });
     }
   }


  public addDeliveryAddressToOrder(): void {
    this.service.createDeliveryAddressForOrder(this.orderID, this.deliveryAddressDTO).subscribe(
      result => {
        this.router.navigate(['/order/payment']);
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
