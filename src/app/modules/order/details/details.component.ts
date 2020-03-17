import { Component, OnInit, Input } from '@angular/core';
import { OrderDetailsDTO } from 'src/app/core/dto/order';
import { OrderService } from 'src/app/core/services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NgbDateStruct, NgbTimeStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateTimeDTO } from 'src/app/core/dto/date-time-dto';
import { FormService } from 'src/app/core/services/form.service';
import { environment } from 'src/environments/environment';
import { NumberUtilities } from 'src/app/core/utilites/number.utilities';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  private orderID: string;
  private minimalAheadDays = 6;  // Used to calculate minimal input date
  @Input() public date: NgbDateStruct;  // Delivery date input model
  @Input() public time: NgbTimeStruct = {hour: 0, minute: 0, second: 0};  // Delivery time input model
  @Input() public orderDetails: OrderDetailsDTO = {  // DTO used in request to backend
    message: '',
    deliveryDate: '',
    additionalNote: ''
  };
  public minimalDate: NgbDateStruct = {year: 1970, month: 1, day: 1};  // Used for user input date validaiton
  public shopOpeningHour = environment.shopOpeningHour;  // Used for user input delivery hours validaiton
  public shopClosingHour = environment.shopClosingHour;  // Used for user input delivery hours validaiton

  constructor(private orderService: OrderService,
              private router: Router,
              private snackBar: MatSnackBar,
              private numberUtilities: NumberUtilities,
              public formService: FormService,
              public ngbCalendar: NgbCalendar,) {
      this.setMinimalDate(this.countMinimalDate(this.minimalAheadDays));
      this.orderID = this.retrieveOrderID();
    }

  ngOnInit() {}

  /**
   * Retrieve currently handled Order ID, that user inputs will be added to.
   */
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

  /**
   * Set minimal date to the user input component allowing input validation.
   *
   * @param minimalDate - minimal date to set to user input component.
   */
  private setMinimalDate(minimalDate: Date): void {
    this.minimalDate.day = minimalDate.getDate();
    this.minimalDate.month = minimalDate.getMonth() + 1;
    this.minimalDate.year = minimalDate.getFullYear();

  }

  /**
   * Create Date object by adding provided number of days to current date to be later used in Date input field as minimum.
   * Used for date validation.
   *
   * @param minimalNumberOfDaysAhead - how many days to add to the currently extracted date.
   */
  private countMinimalDate(minimalNumberOfDaysAhead: number): Date {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + minimalNumberOfDaysAhead);
    return currentDate;
  }

  /**
   * Create proper string from data and time models, that will be deserializable by backend
   * Format: YYYY-MM-DD HH:MM
   *
   * @param dateTimeString - string to save user input into;
   */
  private convertDateTimeToString(dateTimeString: string): string {
    return this.date.year
    + '-' + this.numberUtilities.addLeftPaddingZeros(this.date.month, 2)
    + '-' + this.numberUtilities.addLeftPaddingZeros(this.date.day, 2)
    + ' ' + this.numberUtilities.addLeftPaddingZeros(this.time.hour, 2)
    + ':' + this.numberUtilities.addLeftPaddingZeros(this.time.minute, 2);
  }

  /**
   * Send request to backend to add Order Details into currently handled order and redirect to payment page if successfull.
   */
  public updateOrderDetails(): void {
    this.orderDetails.deliveryDate = this.convertDateTimeToString(this.orderDetails.deliveryDate);
    console.log(this.orderDetails);
    this.orderService.updateOrderDetails(this.orderID, this.orderDetails).subscribe(
      res => {
        this.router.navigate(['/order/payment']);
      },
      err => {
        console.log(err);
        this.router.navigate(['/']).then(
          () => {
           this.snackBar.open('Couldn\'t add details to your order', 'Error', {duration: 3000});
          }
        );
      });
  }
}
