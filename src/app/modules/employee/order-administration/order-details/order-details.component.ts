import { Component, Input, OnInit } from '@angular/core';

import { OrderDTO } from 'src/app/core/dto/order';
import { Price } from 'src/app/core/dto';
import { ShippingService } from 'src/app/core/services/shipping.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['/order-details.component.sass'],
})
export class OrderDetailsComponent implements OnInit {
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
  public resourcesLoaded = true;

  constructor(private shippingService: ShippingService) {}

  ngOnInit() {
    this.deliveryPrice = this.shippingService.getShippingPrice();
  }

  public updateDetails(): void {}
}
