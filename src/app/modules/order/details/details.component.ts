import { Component, OnInit, Input } from '@angular/core';
import { OrderDetailsDTO } from 'src/app/core/dto/order';
import { OrderService } from 'src/app/core/services';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NgbDateStruct, NgbTimeStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateTimeDTO } from 'src/app/core/dto/date-time-dto';
import { FormService } from 'src/app/core/services/form.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent implements OnInit {
  private orderID: string;
  private minimalAheadDays = 6;
  @Input() public date: NgbDateStruct;
  @Input() public time: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  @Input() public orderDetails: OrderDetailsDTO = {
    message: '',
    deliveryDate: {year: 0, month: 0, day: 0, hour: 0, minute: 0, second: 0},
    additionalNote: ''
  };
  public minimalDate: NgbDateStruct = {year: 1970, month: 1, day: 1};
  public shopOpeningHour = environment.shopOpeningHour;
  public shopClosingHour = environment.shopClosingHour;

  constructor(private orderService: OrderService,
              private formService: FormService,
              public ngbCalendar: NgbCalendar,
              private router: Router,
              private snackBar: MatSnackBar) {
      this.orderID = this.retrieveOrderID();
      this.setMinimalDate(this.countMinimalDate(this.minimalAheadDays));
    }

  ngOnInit() {}

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

  private setMinimalDate(minimalDate: Date): void {
    this.minimalDate.day = minimalDate.getDate();
    this.minimalDate.month = minimalDate.getMonth() + 1;
    this.minimalDate.year = minimalDate.getFullYear();

  }

  private countMinimalDate(minimalNumberOfDaysAhead: number): Date {
    const currentDate = new Date();
    console.log(currentDate.getDate());
    currentDate.setDate(currentDate.getDate() + minimalNumberOfDaysAhead);
    console.log(currentDate.getDate());
    return currentDate;
  }

  private setDateTimeToDTO(dateTimeDTO: DateTimeDTO): DateTimeDTO {
    dateTimeDTO.year = this.date.year;
    dateTimeDTO.month = this.date.month;
    dateTimeDTO.day = this.date.day;
    dateTimeDTO.hour = this.time.hour;
    dateTimeDTO.minute = this.time.minute;
    dateTimeDTO.second = this.time.second;
    return dateTimeDTO;
  }

  public updateOrderDetails(): void {
    this.orderDetails.deliveryDate = this.setDateTimeToDTO(this.orderDetails.deliveryDate);
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
