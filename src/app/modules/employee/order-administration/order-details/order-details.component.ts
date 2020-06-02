import { ActivatedRoute, PRIMARY_OUTLET, Router } from '@angular/router';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MessageResponseDTO, Price } from 'src/app/core/dto';

import { AccountAdministrationService } from 'src/app/core/services/administration/account-administration.service';
import { AccountEmployeeDetailsDTO } from 'src/app/core/dto/administration/account-employee-details.dto';
import { MatSnackBar } from '@angular/material';
import { OrderAdministrationService } from 'src/app/core/services/administration/order-administration.service';
import { OrderDTO } from 'src/app/core/dto/order';
import { ShippingService } from 'src/app/core/services/order/shipping.service';

/* TODO: Add Constraints for input fields */
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['/order-details.component.sass'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() public clientDetailsCollapsed = false;
  @Input() public shoppingCartCollapsed = false;
  @Input() public deliveryAddressCollapsed = false;
  @Input() public deliveryAddressEditable = false;
  @Input() public detailsCollapsed = false;
  @Input() public detailsEditable = false;
  @Input() public paymentCollapsed = false;
  @Input() public paymentEditable = false;
  @Input() public changesAvailableForProcessing = false;
  @Input() public employeeDetailsCollapsed = false;
  @Input() public employeeDetailsEditable = false;
  public paymentTypes: string[];
  public orderStatuses: string[];
  public deliveryPrice: Price;
  @Input() public orderDTO: OrderDTO = {
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
  public accountDetails: AccountEmployeeDetailsDTO = {
    accountName: '',
    email: '',
  };
  public orderResourcesLoaded = false;
  public accountResourcesLoaded = false;

  constructor(
    private shippingService: ShippingService,
    private activatedRoute: ActivatedRoute,
    private orderAdministrationService: OrderAdministrationService,
    private accountAdministrationService: AccountAdministrationService,
    private snackBar: MatSnackBar
  ) {
    this.paymentTypes = activatedRoute.snapshot.data['paymentTypes'];
    this.orderStatuses = activatedRoute.snapshot.data['orderStatuses'];
    activatedRoute.params.subscribe((val) => {
      this.retrieveDisplayData();
    });
  }

  ngOnInit() {}

  public cancelChanges(): void {
    this.retrieveDisplayData();
    this.snackBar.open('Changes discarded.', 'Information', { duration: 3500 });
  }

  public saveChanges(): void {
    this.orderAdministrationService.updateOrder(this.orderDTO).subscribe(
      (res: MessageResponseDTO) => {
        this.snackBar.open(res.message, 'Information', { duration: 3500 });
      },
      (err: any) => {
        console.log(err);
        this.snackBar.open(
          "Couldn't update order - invalid properties.",
          'Error',
          {
            duration: 3500,
          }
        );
        this.retrieveDisplayData();
      }
    );
    this.resetEditableBooleanIndicators();
  }

  private retrieveClientDetails(orderID: string): void {
    this.accountAdministrationService
      .retrieveEmployeAccDetails(orderID)
      .subscribe(
        (res: AccountEmployeeDetailsDTO) => {
          this.accountDetails = res;
          this.accountResourcesLoaded = true;
        },
        (err: any) => {
          this.snackBar.open("Couldn't retrieve account details.", 'Error', {
            duration: 3500,
          });
        }
      );
  }

  private retrieveOrderDetails(orderID: string): void {
    this.orderAdministrationService.retrieveOrder(orderID).subscribe(
      (res: OrderDTO) => {
        this.orderDTO = res;
        this.orderResourcesLoaded = true;
      },
      (err: any) => {
        this.snackBar.open("Couldn't retrieve order details.", 'Error', {
          duration: 3500,
        });
      }
    );
  }

  private retrieveDisplayData() {
    this.orderResourcesLoaded = false;
    this.resetEditableBooleanIndicators();
    const orderID = this.activatedRoute.snapshot.url[1].path;
    this.deliveryPrice = this.shippingService.getShippingPrice();
    this.retrieveClientDetails(orderID);
    this.retrieveOrderDetails(orderID);
  }

  private resetEditableBooleanIndicators() {
    this.changesAvailableForProcessing = false;
    this.detailsEditable = false;
    this.paymentEditable = false;
    this.deliveryAddressEditable = false;
    this.employeeDetailsEditable = false;
  }
}
